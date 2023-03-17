import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AuthGuard } from '../core/helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HeroesComponent, canActivate: [AuthGuard] },

  { path: ':id', component: HeroDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class HeroRoutingModule { }