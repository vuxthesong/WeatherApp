import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.moddule';
import { WeatherComponent } from './weather.component';

@NgModule({
    declarations: [WeatherComponent],
    imports: [CommonModule, WeatherRoutingModule],
    exports: [],
})
export class WeatherModule {}
