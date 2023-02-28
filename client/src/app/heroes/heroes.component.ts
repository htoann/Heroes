import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { Hero } from '../core/models/hero.model';
import { createHero, getHeroes } from '../core/store/hero/hero.actions';
import { heroesSelector } from '../core/store/hero/hero.selector';
import { HeroService } from './../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    if (!name) {
      return;
    }
    name = name.trim();
    this.store.dispatch(createHero({ name }))
  }

  delete(hero: Hero): void {
    console.log(hero)
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero._id!).subscribe();
  }
}