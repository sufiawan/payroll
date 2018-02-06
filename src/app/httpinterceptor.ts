import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    public token: string;
    constructor(
        private storage:SessionStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log("intercepted request ... ");

        // Clone the request to add the new header
        let currentUser = JSON.parse(this.storage.retrieve("currentUser"));
        this.token = currentUser && currentUser.token;
        let newReq;
        if (this.token){
            let tokenStr = "Token " + this.token;
            newReq = req.clone({ headers: req.headers.set("Authorization", tokenStr)});
            //console.log(tokenStr);
        }

        //console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(newReq ? newReq : req)
            .catch((error, caught) => {
            //intercept the respons error and displace it to the console
                console.log("Error Occurred");
                console.log(error);
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}