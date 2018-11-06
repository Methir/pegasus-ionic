import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { HelperService } from '../../shared/helper.service';

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
                if (error instanceof HttpErrorResponse) {
                    const authService = this.injector.get(AuthService);
                    const helperService = this.injector.get(HelperService);

                    switch (error.status){
                        case 0 : 
                            helperService.persistAlert("Favor verificar a conexão!");
                            break;
                        case 400 : 
                            helperService.persistAlert("Requisição incorreta!");
                            break;
                        case 401 :
                            helperService.persistAlert("Credenciais de usuário inválidas!");
                            authService.logout();
                            break;
                        case 422 :
                            helperService.persistAlert(error.error.message);
                            break;
                        case 500 :
                            helperService.persistAlert("Error ao conectar com o servidor!");
                            break;
                    }
                }
            })
        );
    }
}