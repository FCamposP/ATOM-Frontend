// src/app/auth/auth.guard.ts

import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
