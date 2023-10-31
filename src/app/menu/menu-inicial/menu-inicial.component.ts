import { DadosEstabelecimento } from './../service/menu-acesso-filtro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  dadosEstabelecimento:DadosEstabelecimento[] = []

  username:any = '';
  cars:any = '';

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

  constructor(
    private route: ActivatedRoute,
    private menuAcessoService : MenuAcessoService,
  ) {
    this.route.params.subscribe(params => {
    this.username = params['username'];
  });}

  ngOnInit(): void {
    this.menuAcessoService.getDadosEstabelecimento().then(dados => {
			this.dadosEstabelecimento = dados;
		});
  }

  adicionarDados(){
    this.realizaInclusao = true;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

  detalharDados(){
    this.realizaInclusao = false;
    this.desabilitarCamposManter = true;
    this.acessarDadosTelaManter = true;
  }

  alterarDados(){
    this.realizaInclusao = false;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

}
