
import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@core/layout/spinner/spinner.component';
import { CookieService } from 'ngx-cookie-service';
import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    providers:[CookieService],
    imports: [CommonModule, RouterOutlet, AppLayoutModule],
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        loadMessages(deMessages);
        locale('es-SV');

        this.primengConfig.ripple = true;
    }
}
