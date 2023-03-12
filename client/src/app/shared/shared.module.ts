import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { HeroSearchComponent } from '../hero/hero-search/hero-search.component';

const components = [
  NavbarComponent,
  LoadingComponent,
  CapitalizePipe,
  HeroSearchComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
