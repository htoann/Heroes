import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Hero } from '../../core/models/hero.model';
import { deleteHero, getHero, updateHero } from '../../core/store/hero/hero.actions';
import { select, Store } from '@ngrx/store';
import { currentHeroSelector } from '../../core/store/hero/hero.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero: Hero | null;
  tags?: string[];
  form: FormGroup;
  private heroSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      mail: ["", Validators.email],
      gender: "",
      age: ["", Validators.min(0)],
      address: "",
    });
  }

  get mail() {
    return this.form.get('mail')
  }

  ngOnInit(): void {
    this.getHero();
  }

  private getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getHero({ id }))
    this.heroSubscription = this.store.pipe(select(currentHeroSelector)).subscribe(hero => {
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
      }
    })
  }

  updateHero(): void {
    const updatedHero = { ...this.hero, ...this.form.value, };
    updatedHero.tags = this.tags?.map(tag => tag.toLowerCase().replace(/\s+/g, ''));
    this.store.dispatch(updateHero({ hero: updatedHero }));
  }

  deleteHero(id: string): void {
    this.store.dispatch(deleteHero({ id }))
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