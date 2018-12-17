import {Tenant} from "./tenant.model";

export class User {

    private _username: string;
    private _currentTenant: Tenant;
    private _accessibleTenants: Tenant[];

    constructor(user: User = <User>{}) {
        this._currentTenant = user.currentTenant;

        this._username = user.username;

        this._accessibleTenants =
            (user.accessibleTenants != null)
                ? user.accessibleTenants.map(value => new Tenant(value))
                : null;
    }

    get username(): string {
        return this._username;
    }

    get currentTenant(): Tenant {
        return this._currentTenant;
    }


    get accessibleTenants(): Tenant[] {
        return this._accessibleTenants;
    }
}