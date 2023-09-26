import {
    CanActivateFn,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { inject } from '@angular/core';

export const authGuardUser: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const auth: any = JSON.parse(localStorage.getItem('auth'));
    if (auth.isLoggedIn === true && auth.role === 'user') {
        return true;
    } else {
        inject(Router).navigateByUrl('/access');
        return false;
    }
};

export const authGuardAdmin: CanActivateFn = (route, state) => {
    const auth: any = JSON.parse(localStorage.getItem('auth'));
    if (auth.isLoggedIn === true && auth.role === 'admin') {
        return true;
    } else {
        inject(Router).navigateByUrl('/access');
        return false;
    }
};

export const authLog: CanActivateFn = (route, state) => {
    const auth: any = JSON.parse(localStorage.getItem('auth'));
    if (auth.isLoggedIn === false) {
        return true;
    } else {
        if (auth.role === 'admin') {
            inject(Router).navigateByUrl('/admin');
        } else if (auth.role === 'user') {
            inject(Router).navigateByUrl('/pages/weather');
        }
        return false;
    }
};
