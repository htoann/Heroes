import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  private userSubscription: Subscription | undefined;
  private updateUserSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  get email() {
    return this.form.get('email')
  }

  private getUser(): void {
    this.loading = true;

    const id = this.route.snapshot.paramMap.get('id')!;

    this.userSubscription = this.userService.getUser(id).subscribe(user => {
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

  updateUser(): void {
    const updatedUser = { ...this.user, ...this.form.value };
    this.updateUserSubscription = this.authService.updateUser(updatedUser).pipe(first())
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          this.error = error.error;
        }
      })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }
  }
}
