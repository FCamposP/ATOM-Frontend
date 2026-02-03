import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GeneralService } from '@core/services/general.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import Swal from 'sweetalert2';
import { catchError, EMPTY, finalize, from, of, switchMap, throwError } from 'rxjs';


@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        FormsModule,
        RippleModule,
        RouterModule
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    private OnDestroy$ = inject(DestroyRef);
    private service = inject(GeneralService);
    private fb = inject(FormBuilder);
    private router = inject(Router);


    loading = false;
    errorMessage = '';

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    get email() {
        return this.loginForm.controls.email;
    }

    constructor() { }

    ngOnInit(): void {

    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        const payload = {
            email: this.email.value,
        };

        this.service
            .Post("auth", "login", payload)
            .pipe(
                takeUntilDestroyed(this.OnDestroy$),

                switchMap((response: any) => {

                    if (response.status === 200) {
                        return of(response);
                    }

                    if (response.status === 404) {

                        return from(
                            Swal.fire({
                                title: "",
                                text: "¿Desea crear una nueva cuenta con '" + payload.email + "'?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#ff6600",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirmar",
                                cancelButtonText: "Cancelar",
                            })
                        ).pipe(

                            switchMap((result) => {

                                if (!result.isConfirmed) {
                                    return throwError(() => new Error("Registro cancelado por el usuario"));
                                }

                                return this.service.Post("auth", "register", payload);
                            })
                        );
                    }

                    // Otro caso inesperado
                    return throwError(() => new Error(response.message));
                }),

                catchError((err) => {

                    if (err.message === "Registro cancelado por el usuario") {
                        return EMPTY;
                    }

                    this.errorMessage =
                        err.error?.message || err.message || "Error inesperado";

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: this.errorMessage,
                    });

                    return EMPTY;
                }),

                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((finalResponse: any) => {

                if (finalResponse.status === 200 || finalResponse.status === 201) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        text: finalResponse.message,
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                    });

                    localStorage.setItem("token", finalResponse.data.token);
                    this.router.navigate(['/']);
                }
            });
    }




}
