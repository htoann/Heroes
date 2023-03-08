import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: ':userId', component: UserDetailComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }