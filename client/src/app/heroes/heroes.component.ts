import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { Hero } from '../core/models/hero.model';
import { deleteHero, getHeroes } from '../core/store/hero/hero.actions';
import { heroesSelector } from '../core/store/hero/hero.selector';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes)
  }

  deleteHero(id: string): void {
    this.store.dispatch(deleteHero({ id }))
  }
}