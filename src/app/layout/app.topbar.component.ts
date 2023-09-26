import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) {}

    handleSignOut() {
        this.authService.setRole('null');
        this.authService.setIsLoggedIn(false);
        this.router.navigateByUrl('/');
    }

    handleClikeLogo(): void {
        let role = this.authService.getRole();
        switch (role) {
            case 'user': {
                this.router.navigateByUrl('/pages/weather');
                break;
            }
            case 'admin': {
                this.router.navigateByUrl('/admin/manage/crud');
                break;
            }
        }
    }
}
