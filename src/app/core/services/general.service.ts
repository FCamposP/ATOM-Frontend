import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpStatus } from '@core/models/enums/http-status';

@Injectable({
    providedIn: 'root',
})
export class GeneralService<T> {
    private urlEndpoint: string = environment.apiUrl;
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private router = inject(Router);

    constructor() { }


    get(controller: string, action?: string, queryParams?: HttpParams): Observable<any> {
        let path = controller + "/" + (action != "" ? action + "/" : "");
        return this.http.get(this.urlEndpoint + path, { params: queryParams }).pipe(
            map(response => response),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    post(controller: string, method: string, body: any, queryParams?: HttpParams): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.post(this.urlEndpoint + path, body, { params: queryParams }).pipe(
            map(response => response),
            catchError(error => {
                return this.handleError(error);
            })
        )
    }

    put(controller: string, method: string, body: any, queryParams?: HttpParams): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.put(this.urlEndpoint + path, body, { params: queryParams}).pipe(
            map(response => response),
            catchError(this.handleError)
        )
    }

    delete(controller: string, method: string, queryParams?: HttpParams, body?: any): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.delete(this.urlEndpoint + path, { body: body, params: queryParams}).pipe(
            map(response => response),
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error != undefined && error.error.message != null) {
            if (error.status === HttpStatus.UNAUTHORIZED) {
                this.router.navigate(['/login']);

                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    text: error.error.message,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                });
                this.authService.logout();
            }
        }

        if (error.status === 0) {

            console.log('Ha ocurrido un error:', error.error);
        } else {

            console.log(
                `Codigo retornado por el servidor ${error.status}, Error: `, error.error);
        }

        return throwError(() => new Error('Algo salió mal; favor intente nuevamente más tarde.'));
    }

}
