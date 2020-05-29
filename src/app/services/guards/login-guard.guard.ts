import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ){}

  canActivate(){

    if( this._usuarioService.estaLogueado() ){
      console.log("Paso el Guard");
      return true;
    }else{
      console.log('Bloquedo por el Guard');
      this._router.navigate(['/login']);
      return false;
    }

    console.log('Paso el Login Guard');

    return true;

  }
  
  
  
}
