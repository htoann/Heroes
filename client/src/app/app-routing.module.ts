import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './auth/login/login.component';
import { MyHeroesComponent } from './my-heroes/my-heroes.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'heroes/:id/my-heroes', component: MyHeroesComponent },
  { path: 'heroes/:id/my-heroes', component: HeroesComponent },
  { path: 'user/:id', component: UserDetailComponent },

  // {
  //   path: '/books',
  //   loadChildren: () =>
  //     import('./books/books.module').then((b) => b.BooksModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }