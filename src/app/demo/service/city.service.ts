import { Injectable } from '@angular/core';
import { City } from '../interfaces/city';
import { StorageService } from './storage.service';

const cityListStorageKey = 'cityList';

const defaultCityListStorageKey: City[] = [
    {
        id: '1000',
        name: 'Ha Noi',
        code: 'ha-noi',
        country: 'Viet Nam',
    },
];

@Injectable({
    providedIn: 'root',
})
export class CityService {
    cityList: City[];
    constructor(private storageService: StorageService) {
        this.cityList =
            storageService.getData(cityListStorageKey) ||
            defaultCityListStorageKey;
        this.saveList();
    }

    saveList(): void {
        this.storageService.setData(cityListStorageKey, this.cityList);
    }

    getCityList(): City[] {
        return this.cityList;
    }

    getCityById(cityId): City {
        return this.cityList.find((city) => city.id === cityId);
    }

    addCity(city: City): void {
        this.cityList.push(city);
        this.saveList();
    }

    updateCity(city: City, changes: City): void {
        const index = this.cityList.indexOf(city);
        this.cityList[index] = { ...city, ...changes };
        this.saveList();
    }

    deleteCity(city: City): void {
        const index = this.cityList.indexOf(city);
        this.cityList.splice(index, 1);
        this.saveList();
    }
}
