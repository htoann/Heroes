import { Component } from '@angular/core';
import { User } from './core/models/user.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Tour of Heroes';
  user?: User;

  constructor(
    private authService: AuthService,
  ) {
    this.authService.user.subscribe(user => this.user = user?.user);
  }

  logout() {
    this.authService.logout();
  }
}