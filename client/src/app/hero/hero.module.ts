import { NgModule } from '@angular/core';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesComponent } from './heroes/heroes.component';
import { CapitalizePipe } from '../utils/capitalize.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
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