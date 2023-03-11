import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Hero } from '../../core/models/hero.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HeroService } from './../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero: Hero | null;
  tags?: string[];
  form: FormGroup;
  loading: boolean;
  private heroSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private heroService: HeroService
  ) { }

  get mail() {
    return this.form.get('mail')
  }

  get age() {
    return this.form.get('age')
  }

  get name() {
    return this.form.get('name')
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      mail: ["", Validators.email],
      gender: "",
      age: ["", Validators.min(0)],
      address: "",
    });

    this.getHero();
  }

  private getHero(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id')!;
    this.heroSubscription = this.heroService.getHero(id).subscribe(hero => {
      if (hero) {
        this.hero = hero
        this.tags = hero.tags
        this.form.patchValue({
          name: hero.name,
          gender: hero.gender,
          mail: hero.mail,
          age: hero.age,
          address: hero.address,
        });

        this.loading = false;
      }

    })
  }

  updateHero(): void {
    const updatedHero = { ...this.hero, ...this.form.value, };
    updatedHero.tags = this.tags?.map(tag => tag.toLowerCase().replace(/\s+/g, ''));
    this.heroService.updateHero(updatedHero);
  }

  deleteHero(id: string): void {
    this.heroService.deleteHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.heroSubscription) {
      this.heroSubscription.unsubscribe();
    }
  }
}