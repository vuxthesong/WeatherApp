import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/demo/interfaces/city';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CityService } from 'src/app/demo/service/city.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
})
export class CrudComponent implements OnInit {
    cityDialog: boolean = false;

    deleteCitiesDialog: boolean = false;

    deleteCityDialog: boolean = false;

    city: City = {};

    cities: City[] = [];

    selectedCities: City[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private cityService: CityService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.cities = this.cityService.getCityList();
    }

    openNew() {
        this.city = {};
        this.submitted = false;
        this.cityDialog = true;
    }

    deleteSelectedCities() {
        this.deleteCitiesDialog = true;
    }

    editCity(city: City) {
        this.city = { ...city };
        this.cityDialog = true;
    }

    deleteCity(city: City) {
        this.deleteCityDialog = true;
        this.city = { ...city };
    }

    confirmDeleteSelected() {
        this.deleteCitiesDialog = false;
        this.selectedCities.map((city) => this.cityService.deleteCity(city));
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Cities Deleted',
            life: 3000,
        });
        this.selectedCities = [];
        this.cities = this.cityService.getCityList();
    }

    confirmDelete() {
        this.deleteCityDialog = false;
        this.cityService.deleteCity(this.city);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'City Deleted',
            life: 3000,
        });
        this.city = {};
        this.cities = this.cityService.getCityList();
    }

    hideDialog() {
        this.cityDialog = false;
        this.submitted = false;
    }

    saveCity() {
        this.submitted = true;
        if (this.city.name?.trim()) {
            if (this.city.id) {
                let updateCity = this.cityService.getCityById(this.city.id);
                this.city.code = this.city.name
                    .toLowerCase()
                    .split(' ')
                    .join('-');
                this.cityService.updateCity(updateCity, this.city);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'City Updated',
                    life: 3000,
                });
            } else {
                let newCity = { id: this.createId(), ...this.city };
                newCity.code = newCity.name.toLowerCase().split(' ').join('-');
                this.cityService.addCity(newCity);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'City Created',
                    life: 3000,
                });
            }

            this.cities = [...this.cities];
            this.cityDialog = false;
        }
        this.cities = this.cityService.getCityList();
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
