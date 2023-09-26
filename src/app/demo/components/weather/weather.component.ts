import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { CityService } from '../../service/city.service';
import { Router } from '@angular/router';
import { City } from '../../interfaces/city';

@Component({
    templateUrl: './weather.component.html',
    providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
    dataWeatherList: any = [];
    products: any[] = [1, 2, 3, 4, 5];
    city: City = {};
    cities: City[] = [];
    constructor(
        private router: Router,
        private weatherService: WeatherService,
        private cityService: CityService
    ) {}
    ngOnInit() {
        this.cities = this.cityService.getCityList();
        this.cities.map((city) => {
            this.weatherService
                .getWeatherApiSmall(city.code)
                .subscribe((res: any) => {
                    this.dataWeatherList.push(res);
                });
        });
    }

    handleClickWeather(cityName) {
        let cityCode = cityName.toLowerCase().split(' ').join('-');
        // this.router.navigateByUrl(`pages/weather/${cityCode}`);
        this.router.navigate(['pages/weather', cityCode]);
    }
}
