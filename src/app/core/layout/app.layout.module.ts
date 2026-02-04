import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppLayoutComponent } from './app.layout.component';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppTopbarComponent,
        AppSidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        StyleClassModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        MegaMenuModule,
        RippleModule,
        RouterModule,
        ButtonModule,
        MenuModule,
        ToastModule,
        TimesCircleIcon,
    ],
    providers: [
      ],
})
export class AppLayoutModule { }
