import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from '../../../services/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss'
})
export class AppTopbarComponent {

    private layoutService = inject(LayoutService);
    public el = inject(ElementRef);

    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    @ViewChild('searchInput') searchInput!: ElementRef;

    constructor() {}

    activeItem!: number;

    model: MegaMenuItem[] = [
    ];

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this.layoutService.openRightSidebar();
    }

    onMobileTopbarMenuButtonClick() {
        this.layoutService.onTopbarMenuToggle();
    }

    focusSearchInput(){
       setTimeout(() => {
         this.searchInput.nativeElement.focus()
       }, 0);
    }
}
