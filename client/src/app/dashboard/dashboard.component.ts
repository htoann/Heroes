import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import { getHeroes } from '../core/store/hero/hero.actions';
import { heroesSelector } from '../core/store/hero/hero.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}