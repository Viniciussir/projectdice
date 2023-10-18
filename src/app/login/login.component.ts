import { Component, OnInit } from '@angular/core';
import { LoginFiltro } from './service/loginfiltro';
import { MessageService } from 'primeng/api';
import { Operacao } from 'src/app/shared/operacao';
import { RegisterFiltro } from './service/registerfiltro';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFiltro:LoginFiltro = new LoginFiltro();
  registerFiltro:RegisterFiltro = new RegisterFiltro();

  operacao:any = '';

  exibirDialog:boolean = false;

  usernameInvalidLogin:boolean = false;
  passwordInvalidLogin:boolean = false;

  usernameInvalidRegister:boolean = false;
  passwordInvalidRegister:boolean = false;

  indCadastroLogin:Boolean = false;

  constructor(
    private messageService: MessageService, 
  ) { }

  ngOnInit(): void {
    this.operacao = Operacao.LOGIN;
  }

  //#region Validar Login
  verificaCamposLogin(){
    this.messageService.clear();
    if(this.loginFiltro.username){
      if(this.loginFiltro.password){
        this.usernameInvalidLogin = false;
        this.passwordInvalidLogin = false;
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Seu login será realizado em até 24 horas.', life: 3000});
      } else {
        this.passwordInvalidLogin = true;
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
      }
    } else {
      this.usernameInvalidLogin = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
  }
  //#endregion

  //#region Cadastro
  exibirDialogInscrevase(){
    this.registerFiltro = new RegisterFiltro();
    this.usernameInvalidRegister = false;
    this.passwordInvalidRegister = false;
    this.indCadastroLogin = true;
  }

  verificaCamposCadastro(){
    this.messageService.clear();
    if(this.registerFiltro.username){
      if(this.registerFiltro.password){
        this.usernameInvalidRegister = false;
        this.passwordInvalidRegister = false;
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Seu cadastro será efetuado em até 24 horas.', life: 3000});
      } else {
        this.passwordInvalidRegister = true;
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
      }
    } else {
      this.usernameInvalidRegister = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
  }

  retornarLogin(){
    this.indCadastroLogin = false;
  }
  //#endregion
  
  //#region Limpar Mensagem
  limparMensagem(){
    this.messageService.clear();
  }
  //#endregion

 

}
