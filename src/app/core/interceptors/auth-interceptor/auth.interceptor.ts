import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.toLowerCase() === `${environment.apiUrl}auth/login`) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          return this.authService.refreshTokenService().pipe(
            switchMap((refreshResponse: any) => {
              if (refreshResponse.status.requestStatus.codigo === 401) {

                Swal.fire({
                  title: 'Sesión expirada',
                  text: 'Su sesión ha expirado, debe iniciar sesión nuevamente',
                  icon: 'error'
                }).then(() => {
                  setTimeout(() => {
                    this.authService.logoutService();
                  }, 1000);
                });
                throw error;
              }

              // Actualizar el token en el encabezado de la solicitud original
              const tokenResponse = refreshResponse.data;
              localStorage.setItem('Authorization', tokenResponse.accessToken);
              localStorage.setItem('LocalInstance', tokenResponse.tenant);
              localStorage.setItem('expire_at', tokenResponse.expireAt);

              const authRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokenResponse.accessToken}`
                }
              });

              return next.handle(authRequest);
            })
          );
        }

        throw error;
      })
    );
  }

}
