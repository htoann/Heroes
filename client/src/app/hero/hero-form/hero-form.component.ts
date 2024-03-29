import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  @Input() heroes: Hero[] = []
  error: string;

  constructor(public heroService: HeroService, private store: Store) {
  }

  createHero(name: string): void {
    if (!name) {
      return;
    }
    name = name.trim();

    this.heroService.createHero(name);
  }
}
