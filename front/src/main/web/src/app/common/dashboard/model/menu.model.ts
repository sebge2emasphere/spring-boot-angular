import {MenuSection} from "./menu-section.model";

export class Menu {

    private _id: string;
    private _name: string;
    private _default: boolean;
    private _sections: MenuSection[];

    constructor(menu: Menu = <Menu>{}) {
        this._id = menu.id;
        this._default = menu.default;
        this._name = menu.name;

        this._sections =
            (menu.sections != null)
                ? menu.sections.map(value => new MenuSection(value))
                : [];
    }

    get id(): string {
        return this._id;
    }

    get default(): boolean {
        return this._default;
    }

    get name(): string {
        return this._name;
    }

    get sections(): MenuSection[] {
        return this._sections;
    }
}