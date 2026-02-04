import { catchError, EMPTY, from, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { GeneralService } from './general.service';
import Swal from 'sweetalert2';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    private generalService= inject(GeneralService);

    private login(email: string): Observable<any> {
        return this.generalService.post("auth", "login", { email });
    }

    private register(email: string): Observable<any> {
        return this.generalService.post("auth", "register", { email });
    }

    private confirmRegister(email: string): Observable<boolean> {
        return from(
            Swal.fire({
                title: "Usuario no encontrado",
                text: `¿Deseas crear una cuenta con '${email}'?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff6600",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, crear cuenta",
                cancelButtonText: "Cancelar",
            })
        ).pipe(
            switchMap((result) => {
                if (!result.isConfirmed) {
                    return of(false);
                }
                return of(true);
            })
        );
    }

    loginOrRegister(email: string): Observable<any> {
        return this.login(email).pipe(
            switchMap((response) => {
                if (response.status === 200) {
                    return of(response);
                }

                if (response.status === 404) {
                    return this.confirmRegister(email).pipe(
                        switchMap((confirmed) => {
                            if (!confirmed) {
                                return throwError(() => new Error("Registro cancelado"));
                            }

                            return this.register(email).pipe(
                                switchMap((registerResponse) => {
                                    if (registerResponse.status !== 201) {
                                        return throwError(
                                            () => new Error("No se pudo registrar")
                                        );
                                    }
                                    return this.login(email);
                                })
                            );
                        })
                    );
                }
                return throwError(() => new Error(response.message));
            }),

            tap((finalLoginResponse) => {
                if (finalLoginResponse.status === 200) {
                    localStorage.setItem("token", finalLoginResponse.data.token);
                    localStorage.setItem("user", email);
                }
            }),

            catchError((err) => {
                if (err.message === "Registro cancelado") {
                    return EMPTY;
                }

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.error?.message || err.message || "Error inesperado",
                });
                return EMPTY;
            })
        );
    }
}