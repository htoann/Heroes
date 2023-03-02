import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import { AppState } from '../core/store/app.state';
import { createHero, deleteHero, getMyHeroes } from '../core/store/hero/hero.actions';
import { myHeroesSelector } from '../core/store/hero/hero.selector';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.css']
})
export class MyHeroesComponent {
  myHeroes: Hero[] = [];
  constructor(private store: Store<AppState>, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getMyHeroes();
  }

  getMyHeroes(): void {
    this.heroService.getMyHeroes()
      .subscribe(heroes => this.myHeroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createHero(name)
      .subscribe(hero => {
        this.myHeroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.myHeroes = this.myHeroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero._id).subscribe();
  }
}