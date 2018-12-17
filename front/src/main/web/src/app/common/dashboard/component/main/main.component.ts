import {Component, OnDestroy} from '@angular/core';
import {Menu} from "../../model/menu.model";
import {DashboardService} from "../../service/dashboard.service";
import {RouterService} from "../../service/router.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {

    private _currentMenu: Menu;
    private _currentMenuSubscription: Subscription;

    constructor(private _dashboardService: DashboardService) {
        this._currentMenuSubscription = RouterService.currentMenu.subscribe(
            (menu: Menu) => {
                this._currentMenu = menu;
            }
        );
    }

    ngOnDestroy(): void {
        this._currentMenuSubscription.unsubscribe();
    }

    get currentMenu(): Menu {
        return this._currentMenu;
    }

    get availableMenus(): Menu[] {
        return this._dashboardService.loadMenu();
    }
}
