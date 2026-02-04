import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    showTopEnd(type: SweetAlertIcon, message: string) {
        Swal.fire({
            position: "top-end",
            icon: type,
            text: message,
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            timerProgressBar:true
        });
    }
}
