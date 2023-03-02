import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Hero } from '../../core/models/hero.model';
import { HeroService } from '../../core/services/hero.service';
import { getHero, updateHero } from '../../core/store/hero/hero.actions';
import { select, Store } from '@ngrx/store';
import { currentHeroSelector } from '../../core/store/hero/hero.selector';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero: Hero | null;
  tags?: string[];
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      mail: ["", Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      gender: "",
      age: ["", Validators.min(0)],
      address: "",
    });
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getHero({ id }))
    this.store.pipe(select(currentHeroSelector)).subscribe(hero => {
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

  goBack(): void {
    this.location.back();
  }

  updateHero(): void {
    const updatedHero = { ...this.hero, ...this.form.value, };
    updatedHero.tags = this.tags;
    this.store.dispatch(updateHero({ hero: updatedHero }));
    this.goBack();
  }

  addTags(): void {

  }

  get email() {
    return this.form.get('email')
  }

  // Tags

  public onAdd(tag: string) {
    console.log(this.tags)
  }

  public onRemove(tag: string) {
    console.log('tag removed: value is ' + tag);
  }

  public onSelect(tag: string) {
    console.log('tag selected: value is ' + tag);
  }

  public onFocus(tag: string) {
    console.log('input focused: current value is ' + tag);
  }

  public onTextChange(text: string) {
    console.log('text changed: value is ' + text);
  }

  public onBlur(tag: string) {
    console.log('input blurred: current value is ' + tag);
  }

  public onTagEdited(tag: string) {
    console.log('tag edited: current value is ' + tag);
  }
}
