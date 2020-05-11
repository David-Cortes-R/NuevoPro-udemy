import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// ROUTES
import { APP_ROUTES } from './app.routes';


// MODULOS
import { PagesModule } from './pages/pages.module';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent
  ],

  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})




export class AppModule { }