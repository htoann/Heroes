import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { getHeroes } from '../../core/store/hero/hero.actions';
import { heroesSelector } from '../../core/store/hero/hero.selector';
import { AuthService } from './../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  private topHeroesSubscription: Subscription | undefined;

  constructor(private store: Store,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getTopHeroes();
  }

  private getTopHeroes(): void {
    if (this.authService.currentUserValue) {
      this.store.dispatch(getHeroes())
      this.topHeroesSubscription = this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes.slice(1, 5))
    }
  }

  ngOnDestroy(): void {
    if (this.topHeroesSubscription) {
      this.topHeroesSubscription.unsubscribe();
    }
  }
}