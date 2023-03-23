import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

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

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: '**', pathMatch: 'full', component: NotFoundComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }