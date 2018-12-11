import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
    { path: 'app/first', component: FirstComponent},
    { path: 'app/second',      component: SecondComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        FirstComponent,
        SecondComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
