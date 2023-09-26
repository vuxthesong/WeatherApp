import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: WeatherComponent }]),
    ],
    exports: [RouterModule],
})
export class WeatherRoutingModule {}
