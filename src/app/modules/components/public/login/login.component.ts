import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginService } from '@core/services/login.service';
import { finalize } from 'rxjs';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        FormsModule
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    private loginService = inject(LoginService);
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

        const email = this.email.value;

        this.loginService
            .loginOrRegister(email ?? "")
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((response) => {
                if (response?.status === 200) {
                    this.router.navigate(["/"]);
                }
            });
    }

}
