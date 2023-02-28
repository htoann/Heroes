import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import { updateHero } from '../core/store/hero/hero.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = fb.group({
      name: "",
      email: ["", Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      gender: "",
      age: "",
      address: "",
    });
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  updateHero(): void {
    if (this.hero) {
      this.store.dispatch(updateHero({ hero: this.hero }))
    }
    this.goBack();
  }

  get email() {
    return this.form.get('email')
  }
}
