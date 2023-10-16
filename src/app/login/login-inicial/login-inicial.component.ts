import { Component, OnInit } from '@angular/core';
import { LoginFiltro } from '../service/loginfiltro';
import { MessageService } from 'primeng/api';
import { Operacao } from 'src/app/shared/operacao';

@Component({
  selector: 'app-login-inicial',
  templateUrl: './login-inicial.component.html',
  styleUrls: ['./login-inicial.component.scss']
})
export class LoginInicialComponent implements OnInit {

  loginFiltro:LoginFiltro = new LoginFiltro();

  operacao:any = '';

  constructor(
    private messageService: MessageService, 
  ) { }

  ngOnInit(): void {
    this.operacao = Operacao.LOGIN;
  }

  verificaCamposLogin(){
    this.messageService.clear();
    if(this.loginFiltro.username){
      if(this.loginFiltro.password){
       this.validarlogin();
      } else {
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
      }
    } else {
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
  }

  validarlogin(){

  }

  limparMensagem(){
    this.messageService.clear();
  }

}
