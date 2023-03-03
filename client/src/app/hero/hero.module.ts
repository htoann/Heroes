import { NgModule } from '@angular/core';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { CapitalizePipe } from '../utils/capitalize.pipe';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes.component';
import { RouterModule } from '@angular/router';
import { HeroRoutingModule } from './hero-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    FormsModule,
    RouterModule,
    HeroRoutingModule
  ],
  declarations: [
    HeroDetailComponent,
    HeroesComponent,
    CapitalizePipe,
    HeroFormComponent,
    HeroSearchComponent,
    DashboardComponent
  ],
  providers: [
  ]
})
export class HeroModule { }