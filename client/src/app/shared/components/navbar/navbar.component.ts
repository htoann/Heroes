import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Heroes';
  user: User;
  private userSubscription: Subscription | undefined;
  clicked: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // clickEvent() {
  //   this.clicked = !this.clicked;
  // }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
