import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';
import { UserService } from '../../core/services/user.service';
import { getHeroes } from '../../core/store/hero/hero.actions';
import { heroesSelector } from '../../core/store/hero/hero.selector';
import { userSelector } from '../../core/store/auth/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private store: Store, private userService: UserService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.pipe(select(userSelector)).subscribe(user => {
      if (user) {
        this.store.dispatch(getHeroes())
        this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes.slice(1, 5))
      }
    })
  }
}