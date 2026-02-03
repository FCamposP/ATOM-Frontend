import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Observable, catchError, lastValueFrom, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseWrapperDTO } from '../models/interfaces/responseWrapperDTO';
import { ResposeHandler } from '../utilities/responseHandler';
import { ISpinnerService, SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root',
})
export class GeneralService<T> {
    private urlEndpoint: string = environment.apiUrl;
    private http = inject(HttpClient);

    constructor() { }

    private httOptionsDefault = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Local-Instance': sessionStorage.getItem('LocalInstance') ?? 'CR',
        Authorization: 'Bearer ' + sessionStorage.getItem('Bearer'),
    });

    Get(controller: string, action?: string, queryParams?: HttpParams,spinnerService?:ISpinnerService): Observable<any> {
        let path = controller + "/" + (action != "" ? action + "/" : "");
        return this.http.get(this.urlEndpoint + path, { params: queryParams, headers: this.httOptionsDefault }).pipe(
            map(response => response),
            catchError(error => {
                    if (spinnerService) {
                    spinnerService.hide(); // ejemplo
                }
                return this.handleError(error);
            })
        );
    }

    Post(controller: string, method: string, body: any, queryParams?: HttpParams,spinnerService?:ISpinnerService): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.post(this.urlEndpoint + path, body, { params: queryParams, headers: this.httOptionsDefault }).pipe(
            map(response => response),
            catchError(error => {
                if (spinnerService) {
                spinnerService.hide();
            }
            return this.handleError(error);
        })
        )
    }

    Post2(controller: string, method: string, body: any, queryParams?: HttpParams, headers?: HttpHeaders): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.post(this.urlEndpoint + path, body, { params: queryParams, headers: headers }).pipe(
            map(response => response),
            catchError(this.handleError)
        )
    }

    Put(controller: string, method: string, body: any, queryParams?: HttpParams): Observable<any> {

        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.put(this.urlEndpoint + path, body, { params: queryParams, headers: this.httOptionsDefault }).pipe(
            map(response => response),
            catchError(this.handleError)
        )
    }

    Delete(controller: string, method: string, queryParams?: HttpParams, body?: any): Observable<any> {
        let path = controller + "/" + (method != "" ? method + "/" : "");
        return this.http.delete(this.urlEndpoint + path, { body: body, params: queryParams, headers: this.httOptionsDefault }).pipe(
            map(response => response),
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error != undefined && error.error.Message != null) {
            if (error.status===401) {
              window.location.href=environment.loginUrl;
            }
        }

        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Ha ocurrido un error:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.log(
                `Codigo retornado por el servidor ${error.status}, Error: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Algo salió mal; favor intente nuevamente más tarde.'));
    }

    handleMessageError(error: any) {
        if (error !== null) {
            let message = error.message;
            if (error.error?.Message !== undefined)
                message = error.error.Message.split('@@@')[0].replaceAll("'", '').replaceAll('"', '').replaceAll('`', '') + ' - ' + message;

            if (message?.errors === undefined)
                message = error.errors;

            if (message === undefined)
                message = error.Message;

            if (message === undefined)
                message = error;

            return message;
        }
    }

    getHTTPOptionsDefaults() {

        return this.httOptionsDefault;
    }
}
