import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginManterComponent } from './login-manter/login-manter.component';
import { LoginInicialComponent } from './login-inicial/login-inicial.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginInicialComponent 
  },
  { 
    path: 'register', 
    component: LoginManterComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
