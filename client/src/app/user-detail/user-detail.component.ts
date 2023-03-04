import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/models/user.model';
import { select, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { getUser, updateUser } from '../core/store/user/user.actions';
import { userSelector } from '../core/store/user/user.selector';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from './../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: User | null;
  form: FormGroup;
  error: string | undefined

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
      this.form.patchValue({
        name: user.name,
        email: user.email,
      });
    })
  }

  goBack(): void {
    this.location.back();
  }

  updateUser(): void {
    const updatedUser = { ...this.user, ...this.form.value };
    this.authService.updateUser(updatedUser).subscribe(user => {
      this.user = user;
    })
  }

  get email() {
    return this.form.get('email')
  }
}
