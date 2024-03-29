import { Component, OnInit } from '@angular/core';
import { LoginFiltro } from './service/loginfiltro';
import { MessageService } from 'primeng/api';
import { Operacao } from 'src/app/shared/operacao';
import { RegisterFiltro } from './service/registerfiltro';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { ForgotPassword } from './service/forgotpassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFiltro:LoginFiltro = new LoginFiltro();
  registerFiltro:RegisterFiltro = new RegisterFiltro();
  forgotPassword:ForgotPassword = new ForgotPassword();

  operacao:any = '';

  exibirDialog:boolean = false;

  usernameInvalidLogin:boolean = false;
  passwordInvalidLogin:boolean = false;

  emailInvalidRegister:boolean = false;
  usernameInvalidRegister:boolean = false;
  passwordInvalidRegister:boolean = false;

  indCadastroLogin:Boolean = false;

  redefinirSenha:boolean = false;
  ativarAlterarSenha:boolean = false;

  confirmepassword:any = '';

  constructor(
    private router: Router,
    private messageService: MessageService, 
    private loginService: LoginService, 
  ) {}

  ngOnInit(): void {
    this.operacao = Operacao.LOGIN;
  }

  //#region Validar Login
  verificaCamposLogin(){
    this.messageService.clear();
    this.redefinirSenha = false;
    if(!this.loginFiltro.username && !this.loginFiltro.password){
      this.usernameInvalidLogin = true;
      this.passwordInvalidLogin = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário e Senha invalida.', life: 3000});
    }
    else if (!this.loginFiltro.username){
      this.usernameInvalidLogin = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
    else if (!this.loginFiltro.password){
      this.passwordInvalidLogin = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
    } else {
      this.usernameInvalidLogin = false;
      this.passwordInvalidLogin = false;
      this.validarLogin();
    }
  }

  validarLogin(){
    this.loginService.verificarUsername().subscribe(data => {
      let usuarioEncontrado:boolean = false
      let userId:any = '';
      let username:any = '';
      for (let i = 0; i < data.length; i++) {
        if(this.loginFiltro.username == data[i].username && this.loginFiltro.password == data[i].password){
          usuarioEncontrado = true; 
          userId = data[i].id
          username = data[i].username
          break;
        }
      }
      if(usuarioEncontrado){
        this.router.navigate(['/menu',userId, username]);
      } else {
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário e Senha não encontrados.', life: 3000});
        this.redefinirSenha = true;
      }
    },
      error => {
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: error, life: 3000});
      }
    );
  }
  //#endregion

  //#region Cadastro
  exibirDialogInscrevase(){
    this.registerFiltro = new RegisterFiltro();
    this.emailInvalidRegister = false;
    this.usernameInvalidRegister = false;
    this.passwordInvalidRegister = false;
    this.indCadastroLogin = true;
  }

  verificaCamposCadastro(){
    this.messageService.clear();
    if(!this.registerFiltro.username && !this.registerFiltro.password && !this.registerFiltro.email){
      this.emailInvalidRegister = true;
      this.usernameInvalidRegister = true;
      this.passwordInvalidRegister = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Campos invalidos. Verifique os campos informados.', life: 3000});
    }
    else if (!this.registerFiltro.email){
      this.emailInvalidRegister = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'E-mail invalido.', life: 3000});
    }
    else if (!this.registerFiltro.username){
      this.usernameInvalidRegister = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
    else if (!this.registerFiltro.password){
      this.passwordInvalidRegister = true;
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
    }else {
      this.emailInvalidRegister = false;
      this.usernameInvalidRegister = false;
      this.passwordInvalidRegister = false;
      this.realizarCadastroUsername();
    }
  }

  realizarCadastroUsername(){
    this.registerFiltro.status = 'Ativo';
    this.loginService.adicionarUsername(this.registerFiltro).subscribe(response => {
      this.router.navigate(['/menu',response.id, response.username]);
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  retornarLogin(){
    this.usernameInvalidLogin = false;
    this.passwordInvalidLogin = false;
    this.indCadastroLogin = false;
    this.ativarAlterarSenha = false;
  }
  //#endregion
  
  //#region Limpar Mensagem
  limparMensagem(){
    this.messageService.clear();
  }
  //#endregion

  //#region Alterar senha
  exibirDialogAlterarSenha(){
    this.forgotPassword = new ForgotPassword();
    this.indCadastroLogin = true;
    this.ativarAlterarSenha = true;
  }

  verificarCamposAlterarSenha(){
    if(!this.forgotPassword.email && !this.forgotPassword.password && !this.confirmepassword){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Campos invalidos. Verifique os campos informados.', life: 3000});
    } else if (!this.forgotPassword.email){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'E-mail invalido.', life: 3000});
    }
    else if (!this.forgotPassword.password || !this.confirmepassword || this.forgotPassword.password != this.confirmepassword){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Campos invalidos. Senhas não conferem ou não foram informadas.', life: 3000});
    } else {
      this.verificarEmailUser();
    }  
  }

  verificarEmailUser(){
    this.loginService.verificarUsername().subscribe(
      response => {
        if(response){
          let temUserEmail:Boolean = false;
          for (let i = 0; i < response.length; i++) {
            if(response[i].email == this.forgotPassword.email){
              temUserEmail = true;
              this.forgotPassword.id = response[i].id;
              this.forgotPassword.username = response[i].username;
              this.forgotPassword.status = response[i].status;
            } 
          }
          if(temUserEmail){
            this.alterarSenha();
          } else {
            this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Campos invalidos. Verifique o email informado.', life: 3000});
          }
        }
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  alterarSenha(){
    this.loginService.alterarUsername(this.forgotPassword).subscribe(
      response => {
        if(response){
          this.router.navigate(['/menu',response.id, response.username]);
        }
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }
  //#endregion
}
