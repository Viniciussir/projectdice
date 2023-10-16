import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInicialComponent } from './login/login-inicial/login-inicial.component';

const routes: Routes = [
 { 
  path: '', 
  redirectTo: '/login', 
  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
