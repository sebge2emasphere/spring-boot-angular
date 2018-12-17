import {Injectable, Injector} from "@angular/core";
import {ActivationEnd, Route, Router, Routes} from "@angular/router";
import {DefaultComponent} from "../component/default/default.component";
import {GlobalAuthGuard} from "../../authentication/login/service/global-auth-guard.service";
import {LoginComponent} from "../../authentication/login/component/main/login.component";
import {LoginAuthGuard} from "../../authentication/login/service/login-auth-guard.service";
import {LogoutComponent} from "../../authentication/login/component/logout/logout.component";
import {DashboardService} from "./dashboard.service";
import {Menu} from "../model/menu.model";
import {MenuSection} from "../model/menu-section.model";
import {WidgetComponent} from "../component/widget/widget.component";
import {MainComponent} from "../component/main/main.component";
import {NoMenuComponent} from "../component/no-menu/no-menu.component";
import {Subject} from "rxjs";

/**
 */
@Injectable()
export class RouterService {

    static get currentMenu(): Subject<Menu> {
        return RouterService._currentMenu;
    }

    static get currentMenuSection(): Subject<MenuSection> {
        return RouterService._currentMenuSection;
    }

    private _router: Router;

    private static _currentMenuSection = new Subject<MenuSection>();
    private static _currentMenu = new Subject<Menu>();

    private _lastMenu: Menu;
    private _lastMenuSection: MenuSection;

    constructor(private _injector: Injector,
                private _dashboardService: DashboardService) {
    }

    initializeRouting() {
        console.debug('Loading menu');

        const router = this._injector.get(Router);
        const menus = this._dashboardService.loadMenu();

        const routes: Routes = [
            {path: '', pathMatch: 'full', redirectTo: 'mainapp'},
            this.initializeMainApp(menus),
            {path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard]},
            {path: 'logout', component: LogoutComponent, canActivate: [GlobalAuthGuard]},
            {path: '**', redirectTo: 'mainapp'}
        ];

        console.debug('Loading routes {0}.', JSON.stringify(routes));
        router.config = routes;

        this.initializeListeners(router);
    }

    private initializeMainApp(menus): Route {
        let children = menus.map(menu => this.mapMenu(menu));

        const defaultMenu = this.getDefaultMenu(menus);

        if (defaultMenu != null) {
            children.push({
                'path': '',
                pathMatch: 'full',
                redirectTo: defaultMenu
            });
        } else {
            children.push({
                'path': '',
                pathMatch: 'full',
                component: NoMenuComponent
            });
        }

        return {
            path: 'mainapp',
            component: MainComponent,
            canActivate: [GlobalAuthGuard],
            children: children
        };
    }

    private mapMenu(menu: Menu): Route {
        let children = menu.sections.map(section => this.mapMenuSection(menu, section));
        children.push({
            path: '',
            pathMatch: 'full',
            component: DefaultComponent
        });

        return {
            path: menu.id,
            canActivate: [GlobalAuthGuard],
            data: {
                menu: menu
            },
            children: children
        };
    }

    private mapMenuSection(menu: Menu, menuSection: MenuSection): Route {
        return {
            path: menuSection.id,
            canActivate: [GlobalAuthGuard],
            data: {
                menuSection: menuSection
            },
            component: WidgetComponent,
            //children: menuSection.subSections.map(menuSection => this.mapMenuSection(menu, menuSection)) TODO
        };
    }

    private getDefaultMenu(menus: Menu[]): string {
        let defaultMenu = menus.find(menu => menu.default);

        if (defaultMenu != null) {
            return defaultMenu.id;
        } else {
            return null;
        }
    }

    private initializeListeners(router: Router) {
        router.events.subscribe(
            (event) => {
                if (event instanceof ActivationEnd) {
                    const activationEndEvent = <ActivationEnd>event;
                    const menu = <Menu>activationEndEvent.snapshot.data.menu;
                    const menuSection = <MenuSection>activationEndEvent.snapshot.data.menuSection;

                    if ((menu != null) && ((this._lastMenu == null) || (this._lastMenu.id != menu.id))) {
                        this._lastMenu = menu;
                        RouterService._currentMenu.next(this._lastMenu);
                    }

                    if ((menuSection != null) && ((this._lastMenuSection == null) || (this._lastMenuSection.id != menu.id))) {
                        this._lastMenuSection = menuSection;
                        RouterService._currentMenuSection.next(this._lastMenuSection);
                    }
                }
            }
        )
    }
}