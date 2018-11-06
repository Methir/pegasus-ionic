import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { Token } from '../../shared/interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor (public injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        const authProvider: AuthService = this.injector.get(AuthService);
        let token: Token = authProvider.authUser.getValue();
        //console.log(`token interceptado: ${token}`);
        if(token){
            req = req.clone({
                setHeaders: {
                    'Accept' : 'application/json',
                    'Authorization' : `${token.token_type} ${token.access_token}`
                }
            });
        }
        return next.handle(req);
    }
}