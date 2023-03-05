import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';
import { DashboardComponent } from './hero/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

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

  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((b) => b.UserModule),
  },

  { path: '', component: DashboardComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }