import {Injectable} from "@angular/core";
import {Menu} from "../model/menu.model";
import {MenuSection} from "../model/menu-section.model";

@Injectable()
export class DashboardService {

    constructor() {
    }

    loadMenu(): Menu[] {
        return [
            new Menu(<Menu>{
                id: 'a001b35c-47b3-4848-be54-9e62c1367a98',
                name: 'My Menu',
                default: true,
                sections: [
                    new MenuSection(
                        <MenuSection>{
                            id: '233442229e97-4320-95df-bc54a2d258f0',
                            name: 'first sub section'
                        }
                    )
                ]
            }),
            new Menu(<Menu>{
                id: '326f705f-8f32-49fe-8b6e-541fb2fdf431',
                name: 'My Menu 2',
                default: true,
                sections: [
                    new MenuSection(
                        <MenuSection>{
                            id: '502ce5f6-dc65-46d1-8a03-cc39b052c173',
                            name: 'second sub section'
                        }
                    )
                ]
            })
        ];
    }
}