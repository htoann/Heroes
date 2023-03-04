import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { getHeroes } from '../../core/store/hero/hero.actions';
import { heroesSelector } from '../../core/store/hero/hero.selector';
import { userSelector } from '../../core/store/auth/auth.selector';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private store: Store,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getTopHeroes();
  }

  getTopHeroes(): void {
    if (this.authService.currentUserValue) {
      this.store.dispatch(getHeroes())
      this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes.slice(1, 5))
    }
  }
}