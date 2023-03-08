import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    UserRoutingModule
  ],
  declarations: [
    UserDetailComponent,
  ],
  providers: [
  ]
})
export class UserModule { }