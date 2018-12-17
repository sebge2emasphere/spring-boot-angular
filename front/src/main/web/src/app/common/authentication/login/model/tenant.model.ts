export class Tenant {

    private _id: string;
    private _name: string;

    constructor(tenant: Tenant = <Tenant>{}) {
        this._id = tenant.id;
        this._name = tenant.name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}