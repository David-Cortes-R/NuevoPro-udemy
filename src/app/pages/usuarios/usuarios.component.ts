import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/index.service';
import  Swal  from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarUsuarios();

    this._modalUploadService.notificacion
            .subscribe( resp =>  this.cargarUsuarios() );

  }



  mostrarModal(id: string){

    this._modalUploadService.mostrarModal('usuarios', id);

  }


  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
            .subscribe( (resp: any) => {
            
              this.totalRegistros = resp.Total;
              this.usuarios = resp.Usuarios;
              this.cargando = false;
            });

  }


  cambiarDesde(valor: number){

    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();


  }



  buscarUsuario(termino: string){


    if(termino.length <= 0){

      this.cargarUsuarios();
      return;

    }

    this.cargando = true;

    this._usuarioService.buscarUsuario( termino )
            .subscribe( (usuarios: Usuario[]) => {

              this.usuarios = usuarios;
              this.cargando = false;

            });

  }



  borrarUsuario(usuario: Usuario){


    if(usuario._id === this._usuarioService.usuario._id){

      Swal.fire({
        icon: 'error',
        title: 'No puede Borrar Usuario',
        text: 'No Se Puede Borrar A Si Mismo'
      });

      return;
    }

    Swal.fire({
      title: '¿Esta Seguro?',
      text: "Esta a Punto de Borrar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then( (borrar) => {

    

      if ( borrar.value === true ) {

        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe( borrado => {
              console.log( borrado );
              this.cargarUsuarios();
            });

        Swal.fire({
          icon: 'success',
          title: 'Usuario Borrado',
          text: 'El Usuario Ha Sido Borrado Correctamente'
        });

        return true;
      }else{

        return;

      }

    });

  }


  guardarUsuario(usuario: Usuario){

    this._usuarioService.actualizarUsuario(usuario)
            .subscribe();
  }




}
