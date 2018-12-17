import {User} from "../model/user.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class LoginService {

    private _currentUser: User;

    constructor(private httpClient: HttpClient) {
        const retrievedUser = localStorage.getItem('currentUser');

        if (retrievedUser != null) {
            this.login(new User(<User>JSON.parse(retrievedUser)));
        }
    }

    get currentUser(): User {
        return this._currentUser;
    }

    login(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser = user;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this._currentUser = null;
    }

    isAuthenticated(): boolean {
        return this.currentUser != null;
    }

    authenticate(username: string, password: string): Observable<User> {
        return this
            .httpClient
            .post(
                '/my-service/authenticate',
                {
                    username: username,
                    password: password
                }
            )
            .pipe(
                map(user => {
                    return new User(<User>user);
                })
            );
    }
}
