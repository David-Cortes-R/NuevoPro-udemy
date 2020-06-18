import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


import { 
  SettingsService,
  SidebarService,
  SharedService,
  HospitalService,
  UsuarioService,
  MedicoService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService
}  from './index.service';




@NgModule({
  declarations: [],
  
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    HospitalService,
    UsuarioService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
