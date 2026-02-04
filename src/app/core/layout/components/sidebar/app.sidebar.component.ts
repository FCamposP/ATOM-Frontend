import {
    Component,
    ElementRef,
    inject,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { LayoutService } from 'src/app/core/services/app.layout.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent implements OnDestroy {

    private layoutService = inject(LayoutService);
    public el = inject(ElementRef);

    timeout: any = null;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    constructor() { }

    resetOverlay() {
        if (this.layoutService.state.overlayMenuActive) {
            this.layoutService.state.overlayMenuActive = false;
        }
    }

    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.sidebarActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(
                    () => (this.layoutService.state.sidebarActive = false),
                    300
                );
            }
        }
    }


    ngOnDestroy() {
        this.resetOverlay();
    }
}
