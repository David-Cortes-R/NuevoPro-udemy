import { Component, OnInit } from '@angular/core';

import { SubirArchivoService } from 'src/app/services/index.service';
import { ModalUploadService } from './modal-upload.service';


import Swal from 'sweetalert2';




@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

 
  imagenSubir:  File;
  imagenTemp: any;

  constructor(

    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService

  ) { 

    console.log('Modal Listo');

  }


  ngOnInit() {
  }


  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }



  subirImagen(){
    
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {

          console.log( resp );

          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();

        })
        .catch( resp => {
          console.log('Error en la Carga....');
        });

  }



  seleccionImagen(archivo: File){
    
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
  
    if(archivo.type.indexOf('image') < 0){
  
      Swal.fire({
        icon: "error",
        title: "Solo Imagenes",
        text: "El Archivo Seleccionado No es Una Imagen"
      });
  
      this.imagenSubir = null;
      return;
    }
  
    this.imagenSubir = archivo;
  
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
  
    reader.onloadend = () => {
      
      this.imagenTemp = reader.result;
  
    };
  
  
  }




}
