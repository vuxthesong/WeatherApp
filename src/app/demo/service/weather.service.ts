import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {
    apiUrl: string =
        'https://api.weatherapi.com/v1/forecast.json?key=2d04af2a64014804a2a94912230609&days=7';
    apiUrlSmall: string =
        'https://api.weatherapi.com/v1/forecast.json?key=2d04af2a64014804a2a94912230609';
    constructor(private http: HttpClient) {}

    getWeatherApi(cityCode: string) {
        return this.http.get<any>(`${this.apiUrl}&q=${cityCode}`);
    }
    getWeatherApiSmall(cityCode: string) {
        return this.http.get<any>(`${this.apiUrl}&q=${cityCode}`);
    }
}
