import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private message: string;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http
            .get<{ message: string }>("http://localhost:4200/api/my-service/")
            .subscribe(
                observer => {
                    this.message = observer.message;
                }
            );
    }
}
