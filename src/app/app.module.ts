import { MenuAcessoModule } from './menu/menu.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import {RouterModule} from '@angular/router';
import { MenuAcessoService } from './menu/service/menu-acesso.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    RouterModule,
    MenuAcessoModule,
  ],
  providers: [MenuAcessoService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
