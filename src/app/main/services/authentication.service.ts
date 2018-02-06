import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
 
const httpOptions = {
  headers: new Headers(
    { 
      'Content-Type': 'application/json'
    }
  )
};

@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(
      private http: Http,
      private storage:SessionStorageService,
      private toastr: ToastrService
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(this.storage.retrieve("currentUser"));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        return this.http.post('https://cryptic-citadel-16128.herokuapp.com/api-token-auth/', JSON.stringify({ username: username, password: password }), httpOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.store('currentUser', JSON.stringify({ username: username, token: token }));                    
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error, caught) => {                                
                  //return the error to the method that called it
                  if (error.status && error.status == '400')
                    this.toastr.error('Username or password is incorrect', 'Login Failed!');
                  if (error.status && error.status == '408')
                    this.toastr.error('Request Time Out - Cannot comunicate with server', 'Login Failed!');
                  if (error.status && error.status == '404')
                    this.toastr.error('Server Not Found', 'Login Failed!');
                  return Observable.throw(error.status);
                }) as any;
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.storage.clear('currentUser');
    }

    public isAuthenticated(): boolean {      
      return this.token ? true : false;
    }
}