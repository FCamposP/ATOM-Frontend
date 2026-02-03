import { environment } from './../../../environments/environment.prod';
import { CanActivateFn } from '@angular/router';

export const externalRedirectGuard: CanActivateFn = () => {
  window.location.href = environment.trazarAgroUrl; // cambia esto a tu URL externa
  return false; // previene la navegación en Angular
};
