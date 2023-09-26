import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityWeatherRoutingModule } from './city-weather-routing.moddule';
import { CityWeatherComponent } from './city-weather.component';

@NgModule({
    declarations: [CityWeatherComponent],
    imports: [CommonModule, CityWeatherRoutingModule],
    exports: [],
})
export class CityWeatherModule {}
