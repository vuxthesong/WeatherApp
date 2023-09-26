import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { CityService } from './demo/service/city.service';
import { ButtonModule } from 'primeng/button';

import { WeatherService } from './demo/service/weather.service';
import { HomePageComponent } from './demo/components/home-page/home-page.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, HomePageComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        WeatherService,
        CityService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
