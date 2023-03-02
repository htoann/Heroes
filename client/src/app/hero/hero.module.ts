import { NgModule } from '@angular/core';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
  CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeroDetailComponent,
  ],
  providers: [
  ]
})
export class HeroModule { }