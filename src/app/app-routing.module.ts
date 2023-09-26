import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AccessComponent } from './demo/components/auth/access/access.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomePageComponent } from './demo/components/home-page/home-page.component';
import {
    authGuardUser,
    authGuardAdmin,
    authLog,
} from './auth-guard/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: HomePageComponent,
                },
                {
                    path: 'pages',
                    component: AppLayoutComponent,
                    canActivate: [authGuardUser],
                    children: [
                        {
                            path: 'weather',
                            loadChildren: () =>
                                import(
                                    './demo/components/weather/weather.module'
                                ).then((m) => m.WeatherModule),
                        },
                        {
                            path: 'weather/:cityCode',
                            loadChildren: () =>
                                import(
                                    './demo/components/city-weather/city-weather.module'
                                ).then((m) => m.CityWeatherModule),
                        },
                    ],
                },
                {
                    path: 'admin',
                    component: AppLayoutComponent,
                    canActivate: [authGuardAdmin],
                    children: [
                        {
                            path: 'manage',
                            loadChildren: () =>
                                import(
                                    './demo/components/manage/manage.module'
                                ).then((m) => m.ManageModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    canActivate: [authLog],
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: 'access', component: AccessComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
