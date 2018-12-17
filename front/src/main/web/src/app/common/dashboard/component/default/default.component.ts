import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, UrlSegment} from "@angular/router";

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._activatedRoute.data.subscribe(
            (data: Data) => console.log(data)
        );
    }

}
