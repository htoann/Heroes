import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';
import { select, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { getUser, updateUser } from '../core/store/user/user.actions';
import { userSelector } from '../core/store/user/user.selector';

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
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getUser({ id }))
    this.store.pipe(select(userSelector)).subscribe(user => {
      if (user) {
        this.user = user;
        this.form.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

  updateUser(): void {
    const updatedUser = { ...this.user, ...this.form.value };
    this.store.dispatch(updateUser({ user: updatedUser }));
    // this.store.pipe(select(userSelector)).subscribe({
    //   next: (data) => {
    //     console.log(data)
    //   },
    //   error: (error) => {
    //     this.error = error.error;
    //   }
    // })

    // if (!this.error) this.goBack();
    this.goBack();
  }

  get email() {
    return this.form.get('email')
  }
}
