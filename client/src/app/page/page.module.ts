import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeroModule } from '../hero/hero.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

const components = [
  DashboardComponent,
  NotFoundComponent,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeroModule,
    SharedModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class PageModule { }
