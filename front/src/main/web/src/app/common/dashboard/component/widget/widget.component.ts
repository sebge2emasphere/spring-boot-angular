import {Component, OnDestroy} from '@angular/core';
import {MenuSection} from "../../model/menu-section.model";
import {RouterService} from "../../service/router.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnDestroy {

    private _currentMenuSection: MenuSection;
    private _currentMenuSectionSubscription: Subscription;

    constructor() {
        this._currentMenuSectionSubscription = RouterService.currentMenuSection.subscribe(
            (menuSection: MenuSection) => {
                this._currentMenuSection = menuSection;
            }
        );
    }

    ngOnDestroy(): void {
        this._currentMenuSectionSubscription.unsubscribe();
    }

    get currentMenuSection(): MenuSection {
        return this._currentMenuSection;
    }
}
