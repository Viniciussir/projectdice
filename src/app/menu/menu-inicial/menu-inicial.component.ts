import { DadosEstabelecimento } from './../service/menu-acesso-filtro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { MessageService } from 'primeng/api';
import { Operacao } from 'src/app/shared/operacao';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  dadosEstabelecimento:DadosEstabelecimento[] = []

  id:any = '';
  userId:any = '';
  username:any = '';

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
  operacao:any = '';

  nomeEstabelecimento:any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private menuAcessoService : MenuAcessoService,
  ) {
    this.route.params.subscribe(params => {
    this.userId = params['userId'];
    this.username = params['username'];
  });}

  ngOnInit() {
    this.menuAcessoService.buscarDados(this.userId).subscribe(dados => {
      if(dados.length > 0){
        this.dadosEstabelecimento = dados;
      } else {
        this.dadosEstabelecimento = [
          {
            id: "Exemplo",
            userId: "Exemplo",
            "name": "Exemplo",
            "description": "Exemplo",
            "categories": [],
            "basicInformation": [],
            "image": ["assets/img/logo.jpeg"],
            "openingHours": [],
            "street": "Exemplo",
            "number": "Exemplo",
            "district": "Exemplo",
            "city": "Exemplo",
            "zipCode": "Exemplo",
            "complement": "Exemplo",
            "status": "EXEMPLO"
          }
        ]
      }
		});
  }

  adicionarDados(){
    this.operacao = Operacao.INCLUIR;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

  alterarDados(event:any){
    this.operacao = Operacao.ALTERAR;
    this.id = event;
    this.desabilitarCamposManter = false;
    this.acessarDadosTelaManter = true;
  }

  detalharDados(event:any){
    this.operacao = Operacao.DETALHAR;
    this.id = event;
    this.desabilitarCamposManter = true;
    this.acessarDadosTelaManter = true;
  }

  voltar(){
    this.router.navigate(['/login']);
  }

}
