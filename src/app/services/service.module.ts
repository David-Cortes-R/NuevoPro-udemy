import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { 
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard
}  from './index.service';



@NgModule({
  declarations: [],
  
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard
  ],

  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
