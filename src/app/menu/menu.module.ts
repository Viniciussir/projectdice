import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { MenuManterComponent } from './menu-manter/menu-manter.component';
import { LoginModule } from '../login/login.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuInicialComponent,
    MenuManterComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
  ],
  exports: [
    MenuInicialComponent
  ],
})
export class MenuUserModule { }
