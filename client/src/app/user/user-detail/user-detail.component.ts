import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user.model';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: User | null;
  form: FormGroup;
  error: string | undefined
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.loading = true;
    this.userService.getMe().subscribe(user => {
      this.user = user;
      this.form.patchValue({
        name: user.name,
        email: user.email,
      });
      this.loading = false;
    })
  }

  goBack(): void {
    this.location.back();
  }

  showSuccess() {
    this.toastr.success('Update profile successfully');
  }

  updateUser(): void {
    const updatedUser = { ...this.user, ...this.form.value };
    this.authService.updateUser(updatedUser).pipe(first())
      .subscribe({
        next: (user) => {
          this.user = user;
          this.showSuccess();
        },
        error: (error) => {
          this.error = error.error;
        }
      })
  }

  get email() {
    return this.form.get('email')
  }
}
