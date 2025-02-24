import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user && user.expiration) {
      if (moment() < moment(user.expiration)) {
        return true;
      } else {
        this.notificationService.openSnackBar('Your session has expired');
        this.router.navigate(['auth/login']);
        return false;
      }
    }

    this.router.navigate(['auth/login']);
    return false;
  }
}
