import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

// MODULO PRINCIPALES
import { SharedModule } from '../shared/shared.module';

// ROUTES
import { PAGES_ROUTES } from './pages.routes';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';




@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        AccountSettingsComponent
    ],

    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],

    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})

export class PagesModule {}