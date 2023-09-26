import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { ActivatedRoute } from '@angular/router';
import { City } from '../../interfaces/city';

@Component({
    templateUrl: './city-weather.component.html',
    providers: [WeatherService],
})
export class CityWeatherComponent implements OnInit {
    dataWeather: any = [];
    city: City = {};
    cities: City[] = [];
    constructor(
        private route: ActivatedRoute,
        private weatherService: WeatherService
    ) {
        this.route.params.subscribe(() => {
            this.ngOnInit();
        });
    }
    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const cityCodeFromRoute = String(routeParams.get('cityCode'));
        this.weatherService
            .getWeatherApi(cityCodeFromRoute)
            .subscribe((res: any) => {
                console.log(res);
                this.dataWeather = res;
            });
    }

    getDay(date: string): any {
        const day = new Date(date);
        switch (day.getDay()) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }
}
