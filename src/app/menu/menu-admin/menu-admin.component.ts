import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Operacao } from 'src/app/shared/operacao';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  dados:any[] = [];
  dadoSelecionado:any[] = [];

  dadosUser:any[] = [];
  dadoSelecionadoUser:any[] = [];

  valorFiltro:any = '';

  operacao:any = '';

  id:any = '';

  userId:any = '';

  acessarDadosTelaManter:boolean = false;

  desabilitarCamposManter:boolean = false;

  indPodeExibirTabelaUser:boolean = false;

  dadosUserPermissao:any = {};

  exibirDialogConfirmacao:boolean = false;

  message:any = '';
  
  constructor(
    private router: Router,
    private menuAcessoService : MenuAcessoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.acessarDados();
  }

  acessarDados(){
    this.menuAcessoService.buscarTodosDados().subscribe(dados => {
      this.dados = dados;
		});

    this.menuAcessoService.verificarUsername().subscribe(dados => {
      this.dadosUser = dados;
		});
  }

  voltar(){
    this.router.navigate(['/login']);
  }

  editar(dados:any){
    this.id = dados.id
    this.userId = dados.userId
    this.operacao = Operacao.ADMIN;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

  deletarDados(dados:any){
    this.menuAcessoService.deletarDados(dados.id).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Excluido.', life: 3000});
      this.acessarDados();
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  listarIndUser(event:any){
    this.indPodeExibirTabelaUser = event;
  }

  showConfirmationDialog(dadosUser: any) {
    this.message = dadosUser.adminUser ? 'Você deseja retirar o acesso administrador desse usuário?' : 'Você deseja tornar o acesso desse usuário como administrador?';
    this.dadosUserPermissao = dadosUser;
    this.exibirDialogConfirmacao = true;
  }

  salvarAlteracaoPermissao(dados:any){
    dados.adminUser = dados.adminUser === true? false : true;
    this.menuAcessoService.alterarUsername(dados).subscribe(
      response => {
        dados = response;
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Alteração realizada.', life: 3000});
        this.exibirDialogConfirmacao = false; 
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  hideConfirmationDialog(){
    this.exibirDialogConfirmacao = false; 
  }

}
