import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginDTO } from '../models/interfaces/loginDTO';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginURL: string;
    private refreshLogin: string;

    constructor(private http: HttpClient, private router: Router) {
        this.loginURL = environment.apiUrl + 'Auth/Login';
        this.refreshLogin = environment.apiUrl + 'Auth/Refresh';
    }

    loginService = (payload: ILoginDTO): Observable<any> => {
        return this.http.post<any>(this.loginURL, payload, {
            headers: {
                ContentType: 'application/json',
                'LocalInstance': localStorage.getItem('LocalInstance') ?? '',
            },
        });
    };

    refreshTokenService = () => {
        return this.http.get<any>(this.refreshLogin, {
            headers: {
                refresh_token: localStorage.getItem('refresh_token') ?? '',
            },
        });
    };

    logoutService = () => {
        const token = sessionStorage.getItem('Bearer');
        try {
            if (token !== null || token !== undefined) {
                sessionStorage.removeItem('Bearer');
                sessionStorage.removeItem('LocalInstance');
                sessionStorage.removeItem('UserAssignment');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('expire_at');
                localStorage.removeItem('userId');
                window.location.href = environment.loginUrl;

            }
        } catch (error) {}
    };

    isAuthenticated = (): boolean => {

        var modulePermission = false,
        tokenExists = false;
        tokenExists =
        sessionStorage.getItem('Bearer') != undefined ||
        sessionStorage.getItem('Bearer') != null;
        if (sessionStorage.getItem('UserAssignment') != null) {
            var userUserAssignment = JSON.parse(
                sessionStorage.getItem('UserAssignment') ?? ''
            );
        }
        if (
            userUserAssignment != undefined &&
            userUserAssignment.Modules != undefined
        ) {
            modulePermission = userUserAssignment.Modules.includes(12);
        }

        // return tokenExists && modulePermission;
        return true;

    };

    hasRefreshToken(): boolean {
        return localStorage.getItem('refreshToken') !== null;
    }

    getToken() {
        var tokenSesion: string = '';
        if (typeof window !== 'undefined') {
            const dataCadena = localStorage.getItem('Bearer');
            //console.log('Token: ', dataCadena)
            tokenSesion = JSON.parse(dataCadena!);
            let pattern = RegExp('jwt' + '=.[^;]*');
            let matched = document.cookie.match(pattern);
            let cookie = matched![0].split('=');
            cookie[1];

            console.log(cookie);
        }
        return tokenSesion;
    }

    setSession() {
        window.addEventListener('message', function (event) {
            //debugger
            var frontUrl = environment.frontUrl;
            if (event.origin === frontUrl) {
                if (event.data) {
                    const jwtToken = event.data.jwt;
                    if (jwtToken) {
                        localStorage.setItem('Bearer', jwtToken);
                    }
                }
            }
        });
    }
}
