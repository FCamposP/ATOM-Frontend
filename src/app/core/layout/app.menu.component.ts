import {
    Component,
    DestroyRef,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GeneralService } from '@core/services/general.service';
import { SpinnerService } from '@core/services/spinner.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: `.loader {
  width: 40px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background:
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}`,
})
export class AppMenuComponent implements OnInit {
    private service = inject(GeneralService);
    private spinnerService = inject(SpinnerService);

    private OnDestroy$ = inject(DestroyRef);

    model: any[] = [];
    showMenu: boolean = false;

    ngOnInit() {
        this.spinnerService.show();
        // this.model.push({},{});

        // this.service
        //     .GetWithoutResponse('Access', 'Entities')
        //     .pipe(takeUntilDestroyed(this.OnDestroy$))
        //     .subscribe({
        //         next: (data) => {
        //             setTimeout(() => {
        //                 this.model.forEach((item) => {
        //                     if (data && data.Financial) {
        //                         if (data && data.Financial) {
        //                             if (
        //                                 data.Financial &&
        //                                 data.Financial[item.code] &&
        //                                 data.Financial[item.code].length > 0
        //                             ) {
        //                                 item.show = true;
        //                             }
        //                         }
        //                         // item.show = true;
        //                         this.showMenu = true;
        //                     }
        //                 });
        //             });
        //         },
        //         error: (error) => {},
        //         complete: () => {
        //             this.spinnerService.hide();
        //         },
        //     });
    }
}
