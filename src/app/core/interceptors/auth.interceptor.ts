// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const token = auth.getAccessToken();

    // Agrega el header Authorization si hay token y no es una ruta de auth
    const isAuthRoute = req.url.includes('/auth/login/') ||
                        req.url.includes('/auth/register/') ||
                        req.url.includes('/auth/refresh/');

    const authReq = (token && !isAuthRoute)
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            // 401 en ruta protegida → intenta refresh automático
            if (err.status === 401 && !isAuthRoute) {
                return auth.refreshToken().pipe(
                    switchMap(tokens => {
                        const retried = req.clone({
                            setHeaders: { Authorization: `Bearer ${tokens.access}` }
                        });
                        return next(retried);
                    }),
                    catchError(refreshErr => {
                        auth.logout();
                        return throwError(() => refreshErr);
                    })
                );
            }
            return throwError(() => err);
        })
    );
};