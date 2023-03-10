import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './../core/store/app.state';
import { Hero, HeroSelected } from './../core/models/hero.model';
import { getHeroes } from './../core/store/hero/hero.actions';
import { heroesSelector } from './../core/store/hero/hero.selector';
import { Subject } from 'rxjs';
import { HeroService } from './../core/services/hero.service';
import { Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroSelected[] = [];
  selectedHeroes: string[] = [];
  selectedTags: string[] = [];
  tagsToAdd: string[] = [];
  tagsToRemove: string[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>,
    private authService: AuthService,
    private heroService: HeroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/auth/login']);
    }
    else
      this.getHeroes();
  }

  private getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector), takeUntil(this.unsubscribe$)).subscribe(heroes => {
      this.heroes = heroes.map((hero) => ({
        ...hero,
        selected: false,
      }));
    });
  }

  onSelected(heroSelect: Hero) {
    this.heroes.forEach((hero) => {
      if (hero._id === heroSelect._id) {
        hero.selected = !hero.selected;
      }
    });

    const selectedHeroes = this.heroes.filter((hero) => hero.selected);
    this.selectedTags = selectedHeroes
      .map((hero) => hero.tags)
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter((value): value is string => value !== undefined);

    this.selectedHeroes = selectedHeroes.map(hero => hero._id)
  }

  addTagsToHeroes(): void {
    this.tagsToAdd = this.tagsToAdd.map(tag => tag.toLowerCase().trim().replace(/\s+/g, ''));
    this.heroService.addTagsToHeroes(this.selectedHeroes, this.tagsToAdd).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.getHeroes();
    }
    )
  }

  deleteTagsFromHeroes(): void {
    this.heroService.deleteTagsFromHeroes(this.selectedHeroes, this.tagsToRemove).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.getHeroes();
      this.selectedTags = [];
    }
    )
  }

  onRemove(tag: string): void {
    this.tagsToRemove.push(tag);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}