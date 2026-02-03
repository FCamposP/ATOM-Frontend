import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SpinnerService } from '@core/services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar spinner para todas las solicitudes
    this.spinnerService.show();

    return next.handle(req).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hide();
        return throwError(error);
      })
    );
  }
}
