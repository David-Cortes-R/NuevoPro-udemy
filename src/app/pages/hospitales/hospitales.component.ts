import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/index.service';

import  Swal  from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];
  valor: string;



  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion
          .subscribe( () => {
            this.cargarHospitales();
          });

          
  }



  buscarHospital(termino: string){


    if(termino.length <= 0){

      this.cargarHospitales();
      return;

    }

    this._hospitalService.buscarHospital( termino )
            .subscribe( (hospitales: Hospital[]) => {

              this.hospitales = hospitales;

            });
  }



  cargarHospitales(){

    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => {
              this.hospitales = hospitales;
            });

  }



  guardarHospital(hospital: Hospital){
    
    this._hospitalService.actualizarHospital(hospital)
            .subscribe( () => {
              this.cargarHospitales();
            });


  }


  borrarHospital(hospital: Hospital){

    this._hospitalService.borrarHospital(hospital._id)
                .subscribe( () => {
                  this.cargarHospitales();
                })

  }



  crearHospital(){

    Swal.fire({
      icon: 'info',
      title: 'Crear Hospital',
      text: 'Ingrese el Nombre del Hospital',
      input: 'text',
      // inputPlaceholder: 'Nombre del Hospital',
      // inputValue: '',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
      
    }).then( (valor: any) => {

      this.valor = valor.value;
      
      if (!this.valor || this.valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(this.valor)
            .subscribe( (resp: any) => {

              this.cargarHospitales();
              
              Swal.fire({
                icon: 'success',
                title: "Hospital Creado Con Exito",
                text: this.valor
              });
            });

      });
  
  }



  actualizarImagen(hospital: Hospital){

    this._modalUploadService.mostrarModal('hospitales', hospital._id)

  }




}
