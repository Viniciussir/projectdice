import { DadosEstabelecimento } from './../service/menu-acesso-filtro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  dadosEstabelecimento:DadosEstabelecimento[] = []

  id:any = '';
  userId:any = '';

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  acessarDadosTelaManter:boolean = false;
  desabilitarCamposManter:boolean = false;
  realizaInclusao:boolean = false;

  nomeEstabelecimento:any = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private menuAcessoService : MenuAcessoService,
  ) {
    this.route.params.subscribe(params => {
    this.userId = params['userId'];
  });}

  ngOnInit() {
    this.menuAcessoService.getDados(this.userId).subscribe(dados => {
			this.dadosEstabelecimento = dados;
		});
  }

  adicionarDados(){
    this.realizaInclusao = true;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

  detalharDados(event:any){
    this.realizaInclusao = false;
    this.id = event;
    this.desabilitarCamposManter = true;
    this.acessarDadosTelaManter = true;
  }

  alterarDados(event:any){
    this.realizaInclusao = false;
    this.id = event;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

}
