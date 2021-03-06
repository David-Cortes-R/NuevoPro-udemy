import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';


// import { map } from "rxjs/operators";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';




//SweetAlert
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario: Usuario;
  token: string;
  menu: any[] = [];


  constructor(
    public http: HttpClient,
    public _router: Router,
    public _subirArchivoService: SubirArchivoService
    ) { 

    this.cargarStorage();

  }


  estaLogueado(){
     return ( this.token.length > 5) ? true : false;
  }



  cargarStorage(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }





  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){

     localStorage.setItem('id', id);
     localStorage.setItem('token', token);
     localStorage.setItem('usuario', JSON.stringify(usuario));
     localStorage.setItem('menu', JSON.stringify(menu));

     this.usuario = usuario;
     this.token = token;
     this.menu = menu;
  }


  logout(){

    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this._router.navigate(['/login']);
  }




  loginGoogle(token: string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token })
              .pipe(map( (resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

                console.log(resp);

                return true;

              }));       

  }




  login(usuario: Usuario, recordar: boolean = false){

    if( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    var url = URL_SERVICIOS +'/login';

    return this.http.post(url, usuario)
            .pipe(map(( resp: any) => {

              this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

              return true;
            }),
            
            catchError( err => {

              console.log(err.error.mensaje);

              Swal.fire({
                icon: 'error',
                title: 'Error en el Login',
                text: err.error.mensaje
              });

              return throwError(err);

            })

            );


  }

            


  crearUsuario(usuario: Usuario){

    var url = URL_SERVICIOS +'/usuario';

    return this.http.post( url, usuario)
            .pipe(map( (resp: any) => {

              Swal.fire({
                icon: "success",
                title: "Usuario Creado Con Exito",
                text: usuario.email
              });
              
              return resp.usuario

            }),
              catchError( err => {

                  Swal.fire({
                    icon: 'error',
                    title: err.error.mensaje,
                    // text: err.error.error.message
                    text: "El Correo debe de ser Unico"
                  });

                  return throwError(err);

              })
            );
  }



  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario)
              .pipe(map( (resp: any) => {

                if(usuario._id === this.usuario._id){
                  
                  let usuarioDB: Usuario = resp.usuario;
                  this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);

                }

                Swal.fire({
                  icon: "success",
                  title: "Usuario Actualizado Exitosamente",
                  text: usuario.nombre
                });

                return true;

              }),

              catchError( err => {

                Swal.fire({
                  icon: 'error',
                  title: err.error.mensaje,
                  text: err.error.error.message
                  // text: "El Correo debe de ser Unico"
                });

                return throwError(err);

            })

              );

  }


  cambiarImagen(archivo: File, id: string){

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
                  .then( (resp: any) => {
                   
                    this.usuario.img = resp.usuario.img;

                    Swal.fire({
                      icon: "success",
                      title: "Imagen Actualizada Exitosamente",
                      text: this.usuario.nombre
                    });

                    this.guardarStorage(id, this.token, this.usuario, this.menu);

                  })
                  .catch( resp => {
                    console.log(resp)
                  })

  }


  cargarUsuarios(desde: number){

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuario(termino: string){

    let url = URL_SERVICIOS +'/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
            .pipe(map( (resp: any) => resp.usuarios ));
  }




  borrarUsuario(id: string){

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url );

  };


}
