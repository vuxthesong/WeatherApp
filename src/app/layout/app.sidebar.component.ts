import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { City } from '../demo/interfaces/city';
import { CityService } from '../demo/service/city.service';
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent implements OnInit {
    city: City;
    cities: City[] = [];
    listCity: any[] = [];
    role: string;
    model: any[];

    constructor(
        public layoutService: LayoutService,
        private cityService: CityService,
        private authService: AuthService,
        public el: ElementRef
    ) {}

    ngOnInit(): void {
        this.cities = this.cityService.getCityList();
        this.cities.map((city) => {
            this.listCity.push({
                label: city.name,
                icon: 'pi pi-fw pi-map-marker',
                routerLink: [`/pages/weather/${city.code}`],
            });
        });

        this.role = this.authService.getRole();
        if (this.role === 'admin') {
            this.model = [
                {
                    label: 'Admin',
                    items: [
                        {
                            label: 'Cities',
                            icon: 'pi pi-fw pi-server',
                            routerLink: [`/admin/manage/crud`],
                        },
                        {
                            label: 'Customers',
                            icon: 'pi pi-fw pi-user-edit',
                            routerLink: [`/admin/manage/customer`],
                        },
                    ],
                },
            ];
        } else {
            this.model = [
                {
                    label: 'Cities',
                    items: this.listCity,
                },
            ];
        }
    }
}
