import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './common/dashboard/app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CustomMaterialModule} from "./common/external/material.module";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from './common/authentication/login/component/main/login.component';
import {LoginService} from "./common/authentication/login/service/login.service";
import {GlobalAuthGuard} from "./common/authentication/login/service/global-auth-guard.service";
import {LoginAuthGuard} from "./common/authentication/login/service/login-auth-guard.service";
import {LoginTenantSelectorComponent} from './common/authentication/login/component/tenant-selector/login-tenant-selector.component';
import {LogoutComponent} from './common/authentication/login/component/logout/logout.component';
import {DashboardService} from "./common/dashboard/service/dashboard.service";
import {RouterService} from "./common/dashboard/service/router.service";
import {WidgetComponent} from './common/dashboard/component/widget/widget.component';
import {DefaultComponent} from './common/dashboard/component/default/default.component';
import {MainComponent} from './common/dashboard/component/main/main.component';
import { NoMenuComponent } from './common/dashboard/component/no-menu/no-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        LoginTenantSelectorComponent,
        LogoutComponent,
        DefaultComponent,
        WidgetComponent,
        NoMenuComponent
    ],
    imports: [
        AppRoutingModule,
        CustomMaterialModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        LoginService,
        LoginAuthGuard,
        GlobalAuthGuard,
        DashboardService,
        RouterService,
        {
            provide: APP_INITIALIZER,
            useFactory: (routerService: RouterService) => function () {
                return routerService.initializeRouting()
            },
            deps: [RouterService],
            multi: true
        }
    ],
    entryComponents: [
        MainComponent,
        LoginComponent,
        LogoutComponent,
        DefaultComponent,
        WidgetComponent,
        NoMenuComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}