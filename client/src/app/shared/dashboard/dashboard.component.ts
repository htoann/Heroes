import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { getHeroes } from '../../core/store/hero/hero.actions';
import { heroesSelector } from '../../core/store/hero/hero.selector';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  loading: boolean;
  private topHeroesSubscription: Subscription | undefined;

  constructor(private store: Store,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getTopHeroes();
  }

  private getTopHeroes(): void {
    this.loading = true;

    if (this.authService.currentUserValue) {
      this.store.dispatch(getHeroes())
      this.topHeroesSubscription = this.store.pipe(select(heroesSelector)).subscribe(heroes => {
        this.heroes = heroes.slice(0, 4);
        this.loading = false;
      })
    }

  }

  ngOnDestroy(): void {
    if (this.topHeroesSubscription) {
      this.topHeroesSubscription.unsubscribe();
    }
  }
}