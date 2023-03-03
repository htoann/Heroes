import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';
import { createHero } from '../../core/store/hero/hero.actions';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  @Input() heroes: Hero[] = []

  constructor(public heroService: HeroService, private store: Store) {
  }

  createHero(name: string): void {
    if (!name) {
      return;
    }
    name = name.trim();

    this.store.dispatch(createHero({ name }))

    // this.heroService.createHero(name)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }
}
