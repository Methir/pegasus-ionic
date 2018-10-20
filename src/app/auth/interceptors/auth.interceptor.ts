import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (public injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(tap(    
            (res) => {
                if (res instanceof HttpResponse) {
                    console.log('---> interceptor res:', res);
                    console.log('---> interceptor req:', req);
                }
            },
            (error: HttpErrorResponse) => {
                console.log('---> interceptor erro:', error);
                /*if (error instanceof HttpErrorResponse) {
                    const authService = this.injector.get(AuthService);
                    if (error.status >= 400 && error.status <= 402) {
                        authService.logout();
                    } else if (error.status == 403) {
                        authService.forbiddenError();
                    }
                }*/
            })
        );
    }
}