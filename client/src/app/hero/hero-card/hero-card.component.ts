import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/core/models/hero.model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
  @Input() hero: Hero;
  @Input() checkBox: boolean | false;
}
