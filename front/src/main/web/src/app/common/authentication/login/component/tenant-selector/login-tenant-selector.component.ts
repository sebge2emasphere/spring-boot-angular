import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/user.model";
import {FormControl} from "@angular/forms";
import {Tenant} from "../../model/tenant.model";
import {map, startWith} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Component({
    selector: 'login-tenant-selector',
    templateUrl: './login-tenant-selector.component.html',
    styleUrls: ['./login-tenant-selector.component.css']
})
export class LoginTenantSelectorComponent implements OnInit {

    @Input('currentUser') private _user: User;
    @Output('selectedTenant') private _selectedTenant = new EventEmitter<Tenant>();

    private _tenantNameInput = new FormControl();
    private _availableFilteredOutTenants: Observable<Tenant[]>;

    constructor() {
    }

    ngOnInit() {
        this._availableFilteredOutTenants = this.tenantNameInput.valueChanges
            .pipe(
                startWith<string | Tenant>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.user.accessibleTenants.slice())
            );
    }

    get availableFilteredOutTenants(): Observable<Tenant[]> {
        return this._availableFilteredOutTenants;
    }

    get tenantNameInput(): FormControl {
        return this._tenantNameInput;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get selectedTenant(): Subject<Tenant> {
        return this._selectedTenant;
    }

    toTenantLabel(tenant?: Tenant): string | undefined {
        return tenant ? tenant.name : undefined;
    }

    finishSelection() {
        this._selectedTenant.emit(this._tenantNameInput.value);
    }

    private _filter(tenantName: string): Tenant[] {
        if (tenantName == null) {
            return this.user.accessibleTenants;
        }

        const tenantNameLowerCase = tenantName.toLowerCase();

        return this.user
            .accessibleTenants
            .filter(
                tenant =>
                    tenant.name.toLowerCase().indexOf(tenantNameLowerCase) === 0
            );
    }
}
