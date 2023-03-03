import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './hero/dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./hero/hero.module').then((b) => b.HeroModule),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((b) => b.AuthModule),
  },

  { path: 'user/:id', component: UserDetailComponent },

  { path: '', component: DashboardComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }