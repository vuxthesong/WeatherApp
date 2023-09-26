import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CityWeatherComponent } from './city-weather.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CityWeatherComponent }]),
    ],
    exports: [RouterModule],
})
export class CityWeatherRoutingModule {}
