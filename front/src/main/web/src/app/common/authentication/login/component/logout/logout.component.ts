import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private _loginService: LoginService,
                private _router: Router) {
    }

    ngOnInit() {
        this._loginService.logout();
        this._router.navigate(['/login']);
    }

}
