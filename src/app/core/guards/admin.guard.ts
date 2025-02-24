import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class AdminGuard {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user && user.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
