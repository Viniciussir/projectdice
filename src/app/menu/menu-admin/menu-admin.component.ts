import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Operacao } from 'src/app/shared/operacao';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

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

  exibirDialogStatus:boolean = false;
  dadosUserStatus:any = {};

  exibirDialogExcluirItem:boolean = false;
  dadosItem:any = {};

  exibirDialogExcluirUser:boolean = false;
  dadosUserExcluir:any = {};
  
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

  //#region Voltar Login
  voltar(){
    this.router.navigate(['/login']);
  }
  //#endregion

  //#region Manutenção Item
  editar(dados:any){
    this.id = dados.id
    this.userId = dados.userId
    this.operacao = Operacao.ADMIN;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }
  //#endregion

  //#region Deletar Item
  showConfirmationDialogExcluirItem(dadosUser: any) {
    this.message = 'Você deseja excluir esse item?';
    this.dadosItem = dadosUser;
    this.exibirDialogExcluirItem = true;
  }

  deletarDados(){
    this.menuAcessoService.deletarDados(this.dadosItem.id).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Excluido.', life: 3000});
      this.exibirDialogExcluirItem = false;
      this.acessarDados();
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  hideConfirmationDialogExcluirItem(){
    this.exibirDialogExcluirItem = false; 
  }
  //#endregion

  //#region Atualizar Dados
  atualizarDadosTabela(event:any){
    this.indPodeExibirTabelaUser = event;
    this.acessarDados();
  }
  //#endregion

  //#region Alterar permissão User
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
  //#endregion

  //#region Alterar status User
  showStatusDialog(dadosUser: any) {
    this.message = dadosUser.status == 'Inativo' ? 'Você deseja ativar esse usuário?' : 'Você deseja desativar esse usuário e todos os lugares cadastrados por ele?';
    this.dadosUserStatus = dadosUser;
    this.exibirDialogStatus = true;
  }

  hideStatusDialog(){
    this.exibirDialogStatus = false; 
  }

  salvarAlteracaoStatus(dados:any){
    dados.status = dados.status === 'Ativo'? 'Inativo' : 'Ativo';
    this.menuAcessoService.alterarUsername(dados).subscribe(
      response => {
        dados = response;
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Alteração realizada.', life: 3000});
        this.exibirDialogStatus = false; 
        if(response.status == 'Inativo'){
          this.buscarEstabelecimentos(dados.id);
        }
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  async buscarEstabelecimentos(id:any){
    try{
      let data = await firstValueFrom(this.menuAcessoService.buscarDados(id));
      if (data) {  
        for (let i = 0; i < data.length; i++) {
          await this.desativarEstabelecimentos(data[i])          
        }  
      } else {
        console.error('A chamada à API retornou um valor indefinido.');
      }
    }
    catch(error:any){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: error, life: 3000});
    }
  }

  async desativarEstabelecimentos(dados:any){
    dados.status = 'INATIVO';
    try{
      await firstValueFrom(this.menuAcessoService.alterarDados(dados));
    }
    catch(error:any){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: error, life: 3000});
    }
  }
  //#endregion

  //#region Excluir User
  showConfirmationDialogExcluirUser(dadosUser: any) {
    this.message = 'Você deseja excluir esse Usuário?';
    this.dadosUserExcluir = dadosUser;
    this.exibirDialogExcluirUser = true;
  }

  deletarDadosUser(){
    this.menuAcessoService.deletarUsername(this.dadosUserExcluir.id).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Excluido.', life: 3000});
      this.exibirDialogExcluirUser = false;
      this.acessarDados();
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  hideConfirmationDialogExcluirUser(){
    this.exibirDialogExcluirUser = false; 
  }
  //#endregion

}
