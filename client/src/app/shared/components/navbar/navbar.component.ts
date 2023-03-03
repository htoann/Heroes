import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { fetchUser, logout } from 'src/app/core/store/auth/auth.actions';
import { userSelector } from './../../../core/store/auth/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'Tour of Heroes';
  user: User | null;

  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router,
  ) {
    this.store.pipe(select(userSelector)).subscribe(user => {
      this.user = user
    })

    if (!this.user) {
      this.store.dispatch(fetchUser());
    }
    if (this.userService.userId) {
      this.userService.getUser(this.userService.userId).subscribe((user) => (this.user = user));
    }
  }

  logout() {
    this.store.dispatch(logout())
    this.router.navigate(['/login']);
  }
}
