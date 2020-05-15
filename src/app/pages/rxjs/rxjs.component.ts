import { Component, OnInit, OnDestroy } from '@angular/core';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() { 

    this.subscription = this.regresaObservable()
    .subscribe( 
      numero => console.log('Subs: ', numero),
      error => console.log('Error en el obs: ', error ),
      () => console.log('termino el observer')
    )

  }
 

  ngOnInit() {
  }


  ngOnDestroy(): void {
   console.log("La Pagina se va a Cerrar");
   this.subscription.unsubscribe();
  }




  regresaObservable(): Observable<any>{

   return  new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let interval = setInterval( () => {

        contador += 1;

        var salida = {
          valor: contador
        };



        observer.next(salida);

        // if(contador === 3){
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if(contador === 2){
        //   // clearInterval(interval);
        //   observer.error('Auxilio!!!');
        // }


      }, 1000);

    }).pipe(
      map(resp =>  resp.valor ),
      filter( (valor, index) => {
        if( (valor % 2) ){
          // impar
          return true;
        }else {
          // par
          return false;
        }
      })
    )

  }


}
