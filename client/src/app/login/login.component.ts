import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { postLogin } from '../core/store/user/user.actions';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.f?.['email'].value)
    console.log(this.f?.['password'].value)

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password }: User = this.loginForm.value;
    const user = { email, password }
    this.store.dispatch(postLogin({ user }));

    this.authService.postLogin(this.f?.['email'].value, this.f?.['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: error => {
          this.error = error.error;
          this.loading = false;
        }
      });
  }
}
