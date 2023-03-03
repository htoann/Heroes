import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { Hero } from '../../core/models/hero.model';
import { getHeroes } from '../../core/store/hero/hero.actions';
import { heroesSelector } from '../../core/store/hero/hero.selector';
import { Observable, of } from 'rxjs';
import { HeroService } from './../../core/services/hero.service';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroObjectAdd: Hero[] = [];;
  heroObjectRemove: Hero[] = [];;
  heroIds: string[] = [];;
  heroIdsRemovieTag: string[] = [];;
  tags: string[];
  tagsRemove: string[] = [];
  selectedTags: string[] = [];


  constructor(private store: Store<AppState>, private authService: AuthService, private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
    }
    else
      this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes)
  }

  addTagsToHeroes(): void {
    this.heroService.addTagsToHeroes(this.heroIds, this.tags)
  }

  deleteTagsFromHeroes(): void {
    this.heroService.deleteTagsFromHeroes(this.heroIdsRemovieTag, this.tagsRemove)
  }

  public requestAutocompleteItemsFake = (text: string): Observable<any> => {
    return of(this.heroes);
  };

  public onAddOfAddHeros(tag: string) {
    this.heroIds = this.heroObjectAdd?.map((hero) => hero._id)
    console.log(this.heroIds)
  }

  public onAddOfAddTags(tag: string) {
    console.log(this.tags)
  }

  public onAddOfRemoveHeros(tag: string) {
    this.heroIdsRemovieTag = this.heroObjectRemove?.map((hero) => hero._id)
    this.heroObjectRemove?.map((hero) => {
      hero.tags?.forEach((value) => {
        if (this.selectedTags.indexOf(value) == -1) {
          this.selectedTags.push(value);
        }
      })
    })

    console.log(this.selectedTags)
  }

  public onAddOfRemoveTags(tag: string) {
    console.log(tag)
  }

  public onRemoveOfAddTags(tag: string) {
    console.log('tag removed: value is ' + tag);
  }

  public onRemoveOfRemoveTags(tag: string) {
    this.tagsRemove.push(tag)
    console.log('tag removed: value is ' + tag);
  }

  public onSelectOfAddTags(tag: string) {
    console.log('tag selected: value is ' + tag);
  }

  public onSelectOfRemoveTags(tag: string) {
    console.log('tag selected: value is ' + tag);
  }

  public onFocus(tag: string) {
    console.log('input focused: current value is ' + tag);
  }

  public onTextChange(text: string) {
    console.log('text changed: value is ' + text);
  }
}