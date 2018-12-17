export class MenuSection {

    private _id: string;
    private _name: string;
    private _subSections: MenuSection[];

    constructor(menuSection: MenuSection = <MenuSection>{}) {
        this._id = menuSection.id;
        this._name = menuSection.name;

        this._subSections =
            (menuSection.subSections != null)
                ? menuSection.subSections.map(value => new MenuSection(value))
                : [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get subSections(): MenuSection[] {
        return this._subSections;
    }
}