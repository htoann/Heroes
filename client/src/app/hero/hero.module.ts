import { NgModule } from '@angular/core';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { RouterModule } from '@angular/router';
import { HeroRoutingModule } from './hero-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroesComponent } from './heroes.component';

const components = [
  HeroCardComponent,
  HeroDetailComponent,
  HeroFormComponent,
  HeroesComponent
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    FormsModule,
    RouterModule,
    HeroRoutingModule,
    SharedModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class HeroModule { }