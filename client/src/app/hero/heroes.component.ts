import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero, HeroSelected } from './../core/models/hero.model';
import { HeroService } from './../core/services/hero.service';

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

  allTags: any[] = [];
  tagsToFilter: string[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getAllTags();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().pipe(takeUntil(this.unsubscribe$)).subscribe(heroes => {
      this.heroes = heroes.map((hero) => ({
        ...hero,
        selected: false,
      }));
    })
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
      this.selectedHeroes = [];
    }
    )
  }

  deleteTagsFromHeroes(): void {
    this.heroService.deleteTagsFromHeroes(this.selectedHeroes, this.tagsToRemove).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.getHeroes();
      this.selectedTags = [];
      this.selectedHeroes = [];
    }
    )
  }

  onSelect(tag: any) {
    this.allTags.forEach((t) => {
      if (tag.tag == t.tag) {
        t.selected = !t.selected;
      }
    });

    this.tagsToFilter = this.allTags.filter(tag => tag.selected).map(tag => tag.tag);

    this.heroService.getHeroesFilterTags(this.tagsToFilter).pipe(takeUntil(this.unsubscribe$)).subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  onRemove(tag: string): void {
    this.tagsToRemove.push(tag);
  }

  getAllTags(): void {
    this.heroService.getAllTags().pipe(takeUntil(this.unsubscribe$)).subscribe(tags => {
      this.allTags = tags.map((tag: any) => ({
        tag,
        selected: false,
        readonly: true
      }));
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}