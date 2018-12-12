import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private _message: string;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http
            .get<{ message: string }>("/api/my-service/")
            .subscribe(
                observer => {
                    this._message = observer.message;
                }
            );
    }


    get message(): string {
        return this._message;
    }
}
