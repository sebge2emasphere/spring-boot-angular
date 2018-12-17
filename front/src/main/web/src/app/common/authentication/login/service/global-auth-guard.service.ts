import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from "./login.service";

@Injectable()
export class GlobalAuthGuard implements CanActivate {

    constructor(private loginService: LoginService,
                private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.loginService.isAuthenticated()) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

            return false;
        }

        return true;
    }
}
