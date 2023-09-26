import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer } from 'src/app/demo/interfaces/customer';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class LoginComponent {
    customer: Customer;
    userName?: any;
    password?: any;
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private customerService: CustomerService,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    handleSingIn(userName, password): any {
        if (userName === 'admin' && password === '1102') {
            this.authService.setRole('admin');
            this.authService.setIsLoggedIn(true);
            //go to admin
            this.router.navigateByUrl('/admin/manage/crud');
        } else {
            this.customer = this.customerService.checkCustomer(
                userName,
                password
            );
            if (this.customer != null) {
                this.authService.setRole('user');
                this.authService.setIsLoggedIn(true);
                //go to user
                this.router.navigateByUrl('/pages/weather');
            } else {
                //Error login
                this.router.navigateByUrl('/auth/login');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User information is incorrect',
                    life: 3000,
                });
            }
        }
    }
}
