// src/app/auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // if (this.authService.isAuthenticated()) {
    //   return true;
    // } else {
    //     window.location.href = environment.trazarAgroUrl;
    //   return false;
    // }
    return true;
  }
}
