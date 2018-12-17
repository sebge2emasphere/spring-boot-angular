import {Component, ViewChild} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../../model/user.model";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginTenantSelectorComponent} from "../tenant-selector/login-tenant-selector.component";
import {Tenant} from "../../model/tenant.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @ViewChild('tenantSelector') tenantSelector: LoginTenantSelectorComponent;

    private _authenticating = false;
    private _user: User;
    private _authenticationFailure = false;

    constructor(private loginService: LoginService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    get user(): User {
        return this._user;
    }

    get authenticating(): boolean {
        return this._authenticating;
    }

    get authenticationFailure(): boolean {
        return this._authenticationFailure;
    }

    requireTenantSelection(): boolean {
        return (this.user != null) && (this.user.accessibleTenants.length > 1);
    }

    authenticate(form: NgForm) {
        this._authenticating = true;
        this.loginService
            .authenticate(form.value.username, form.value.password)
            .pipe(first())
            .subscribe(
                (user: User) => {
                    this._authenticating = false;
                    this._authenticationFailure = false;
                    this._user = user;

                    if (!this.requireTenantSelection()) {
                        this.finishAuthenticationProcess();
                    }
                },
                (error: HttpErrorResponse) => {
                    this._authenticating = false;

                    if (error.status == 401) {
                        this._authenticationFailure = true;
                    } else {
                        console.log(error);
                    }
                }
            );
    }

    onSelectedTenant(selectedTenant: Tenant) {
        this.finishAuthenticationProcess();

        // TODO tenant
    }

    private finishAuthenticationProcess() {
        this.loginService.login(this.user);

        let returnUrl: string = this.route.snapshot.queryParams['returnUrl'];

        if (returnUrl != null) {
            this.router.navigate([returnUrl]);
        } else {
            this.router.navigate(['/mainapp']);
        }
    }
}
