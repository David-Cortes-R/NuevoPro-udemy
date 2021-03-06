import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      (res) => console.log('Accion Terminada', res),
    )
    .catch( (error) => {
      console.error('Error en la Promesa', error )
    })


   }



  ngOnInit() {
  }




  contarTres(): Promise<boolean>{

    return new Promise( (resolve, reject) => {

      var contador = 0;

      var intervalo = setInterval( () => {

        contador += 1;
        console.log(contador);

        if(contador === 3){
          resolve(true);
          clearInterval(intervalo);
        }

      }, 1000);
    });

   

  }





}
