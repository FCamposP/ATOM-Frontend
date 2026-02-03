import { CommonModule } from '@angular/common';
import {
    Component, DestroyRef, inject, Injectable, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerService } from '@core/services/spinner.service';
import { off } from 'devextreme/events';
import Button from "devextreme/ui/button";
import { MenuItem } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { from, Observable, switchMap } from 'rxjs';
import { ITab, MenuSelected } from '../../models/interfaces/ITab';
import { TabServiceService } from '../../services/tab.service';

@Injectable({
    providedIn: "root",
})
@Component({
    selector: 'app-tabcontrol',
    standalone: true,
    imports: [TabMenuModule, ButtonModule, CommonModule, TooltipModule],
    templateUrl: './tab-control.component.html',
    styleUrl: './tab-control.component.scss'
})
export class TabControlComponent implements OnInit, OnDestroy {
    @ViewChild('containerRef', { static: true, read: ViewContainerRef }) containerRef!: ViewContainerRef;

    tabs: ITab[] = [];
    items: MenuItem[] = [];
    activeItem: MenuItem = {};
    menuChanged: boolean = true;
    private renderer = inject(Renderer2);
    private spinner = inject(SpinnerService);
    private tabItemOnDestroy$ = inject(DestroyRef);

    constructor(private tabService: TabServiceService) {
        tabService.tabItemObservable.pipe(
            switchMap((menu: MenuSelected) => this.GetComponentType(menu)),
            takeUntilDestroyed(this.tabItemOnDestroy$)
        ).subscribe({
            next: ([menu, componentType]) => {
                if (this.activateMenu({ originalEvent: undefined, item: { uniqueCode: menu.code, idRef: menu.idRef } })) { this.spinner.hide(); return; };

                this.containerRef.detach();
                const component = menu.routerLink() instanceof Promise ? this.containerRef.createComponent<any>(componentType) : this.cloneTab(componentType, menu);
                const selectedRecordRef = component.instance?.selectedRecordRef;
                if (selectedRecordRef !== undefined)
                    component.instance.selectedRecordRef = menu.idRef

                this.tabs.push({
                    header: menu.code,
                    uniqueCode: menu.code,
                    content: component,
                    lastPageNumber: 0,
                    label: menu.label,
                    refreshButton: menu.refreshButton,
                    view: this.containerRef.get(0)!
                })

                const label = menu.label.replace(' *--* ', '-');
                const data: MenuItem = {
                    label: label.length > 19 ? label.substring(0, 19) + '...' : label,
                    labelToolTip: label,
                    fullLabel: menu.label,
                    icon: menu.icon,
                    canClose: menu.canClose,
                    uniqueCode: menu.code,
                    command: (event: any) => this.activateMenu(event)
                };

                this.items.push(data);
                this.activeItem = data;

                this.updateVisibility();
                this.spinner.hide();
            },
            error: (err) => {
                console.log(err);
                this.spinner.hide();
            }
        });
    }

    ngOnInit(): void {

    }

    cloneTab(label: string, menu: MenuSelected) {
        const [item] = this.items.filter(item => item['fullLabel'] === label);
        const [tab] = this.isOpenTab(item['uniqueCode']);
        const component = this.containerRef.createComponent<any>(tab.content.componentType);

        setTimeout(async () => {
            const buttonSave = component.location.nativeElement.querySelector('#btnSave');
            const button = Button.getInstance(buttonSave!) as Button;
            const buttonSaveAction = (button as any)._clickAction;

            off(buttonSave, "dxclick");
            this.renderer.listen(buttonSave, 'click', () => {
                buttonSaveAction(menu.refreshButton);
            });
        }, 2000);

        return component;
    }

    isOpenTab(uniqueCode: string) {
        return this.tabs.filter(tab => tab.uniqueCode === uniqueCode);
    }

    activateMenu(event: { originalEvent: any, item: { uniqueCode: string, idRef: any }; }) {
        if (event.item.uniqueCode === this.activeItem['uniqueCode']) return true;

        let [tab] = this.isOpenTab(event.item.uniqueCode);
        if (tab !== undefined) {
            [this.activeItem] = this.items.filter(item => item['uniqueCode'] === event.item.uniqueCode);

            this.containerRef.detach();
            this.containerRef.insert(tab.view);

            if (event.originalEvent === undefined) {
                const selectedRecordRef = tab.content.instance.selectedRecordRef;
                if (selectedRecordRef !== undefined) {
                    if (event.item.idRef !== undefined)
                        tab.content.instance.selectedRecordRef = event.item.idRef
                }
            }

            this.updateVisibility();
            return true;
        }

        return false;
    }

    onCloseTab(event: any, item: any) {
        event.stopPropagation();

        // confirm(`¿Está seguro que desea cerrar la ventana <b>${item.label}</b>?`, "Confirmación")
        //     .then(dialogResult => {
        //         if (dialogResult) {
        for (let i = 0; this.tabs.length; i++) {
            if (this.tabs[i].uniqueCode === item.uniqueCode) {
                let effect = document.getElementById('effectComponent');
                let uniqueCodeActiveItem: string = this.activeItem['uniqueCode'];
                let uniqueCodeTabs: string = this.tabs[i].uniqueCode;
                let timeout = 0;
                if (effect && uniqueCodeTabs === uniqueCodeActiveItem){
                    effect.classList.remove("effect-component");
                    effect.classList.add("lightSpeedOut");
                    timeout = 500;
                }

                setTimeout(() => {
                    this.tabs[i].content.destroy;
                    this.tabs[i].view.destroy;

                    this.items = this.items.filter(item2 => item2['uniqueCode'] !== item.uniqueCode);
                    this.tabs.splice(i, 1);

                    if (uniqueCodeTabs === uniqueCodeActiveItem)
                        this.activateMenu({ originalEvent: undefined, item: { uniqueCode: this.items[i - 1]['uniqueCode'], idRef: undefined } })
                    else
                        this.updateVisibility();
                }, timeout);

                break;
            }
        };
        //     }
        // });
    }

    GetComponentType(mnu: MenuSelected): Observable<any[]> {
        this.spinner.show();
        return from((async () => [mnu, mnu.routerLink() instanceof Promise ? await mnu.routerLink().then((a: any) => a.default) : mnu.routerLink()])());
    }

    updateVisibility(): void {
        this.menuChanged = false;
        setTimeout(() => { this.menuChanged = true; }, 0);
    }

    ngOnDestroy(): void {
        this.tabs.forEach(tab => {
            // if (tab.content) {
            tab.content.destroy();
            tab.view.destroy();
            // };
        });
    }
}
