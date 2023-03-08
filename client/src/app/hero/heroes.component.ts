import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './../core/store/app.state';
import { Hero } from './../core/models/hero.model';
import { getHeroes } from './../core/store/hero/hero.actions';
import { heroesSelector } from './../core/store/hero/hero.selector';
import { Observable, of, Subject } from 'rxjs';
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
  heroes: Hero[] = [];
  heroObjectAdd: Hero[] = [];
  heroObjectRemove: Hero[] = [];
  heroIds: string[] = [];;
  heroIdsRemovieTag: string[] = [];
  tags: string[];
  tagsRemove: string[] = [];
  selectedTags: string[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>, private authService: AuthService, private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/auth/login']);
    }
    else
      this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector), takeUntil(this.unsubscribe$)).subscribe(heroes => this.heroes = heroes);
  }

  addTagsToHeroes(): void {
    this.tags = this.tags.map(tag => tag.toLowerCase().trim().replace(/\s+/g, ''));
    this.heroService.addTagsToHeroes(this.heroIds, this.tags).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.getHeroes();
    }
    )
  }

  deleteTagsFromHeroes(): void {
    this.heroService.deleteTagsFromHeroes(this.heroIdsRemovieTag, this.tagsRemove).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.getHeroes();
    });
  }

  public requestAutocompleteHeroes = (text: string): Observable<any> => {
    return of(this.heroes);
  };

  public onAddToAddHeroes(tag: string) {
    this.heroIds = this.heroObjectAdd?.map((hero) => hero._id)
  }

  public onRemoveToAddHeroes(hero: Hero) {
    this.heroIds = this.heroIds.filter(id => id !== hero._id)
  }

  public onRemoveToRemoveHeroes(hero: Hero) {
    this.heroIdsRemovieTag = this.heroIdsRemovieTag.filter(id => id !== hero._id)
  }

  public onAddToRemoveHeroes(tag: string) {
    this.heroIdsRemovieTag = this.heroObjectRemove?.map((hero) => hero._id)
    this.heroObjectRemove?.map((hero) => {
      hero.tags?.forEach((value) => {
        if (this.selectedTags.indexOf(value) == -1) {
          this.selectedTags.push(value);
        }
      })
    })
  }

  public onRemoveToRemoveTags(tag: string) {
    this.tagsRemove.push(tag)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}