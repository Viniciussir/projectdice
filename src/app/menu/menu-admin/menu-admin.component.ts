import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Operacao } from 'src/app/shared/operacao';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  dados:any[] = []
  dadoSelecionado:any[] = []

  valorFiltro:any = '';

  operacao:any = '';

  id:any = '';

  userId:any = '';

  acessarDadosTelaManter:boolean = false;

  desabilitarCamposManter:boolean = false;
  
  constructor(
    private router: Router,
    private menuAcessoService : MenuAcessoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.acessarDados();
  }

  acessarDados(){
    this.menuAcessoService.buscarTodosDados().subscribe(dados => {
      this.dados = dados;
		});
  }

  voltar(){
    this.router.navigate(['/login']);
  }

  editar(dados:any){
    this.id = dados.id
    this.userId = dados.userId
    this.operacao = Operacao.ADMIN;
    this.desabilitarCamposManter = true;
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

}
