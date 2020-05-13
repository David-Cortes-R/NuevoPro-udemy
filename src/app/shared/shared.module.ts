import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

// RUTAS
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';





@NgModule({
    declarations:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],

    exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],

    imports:[
        RouterModule,
        CommonModule
    ]
    
})


export class SharedModule {}