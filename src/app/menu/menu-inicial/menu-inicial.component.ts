import { DadosEstabelecimento } from './../service/menu-acesso-filtro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { MessageService } from 'primeng/api';
import { Operacao } from 'src/app/shared/operacao';
import { firstValueFrom } from 'rxjs';

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

  acessarDadosTelaAdmin:boolean = false;

  value: number = 0;

  carregando:boolean = true;

  dadosUser:any = {};
  botaoBloqueado: boolean = false;

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
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 40) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(interval);
          this.carregando = false;
      }
  }, 1000);
    this.verificarTipoUsuario();
  }

  verificarTipoUsuario(){
    this.menuAcessoService.verificarUsername().subscribe(data => {
      let adminUser:boolean = false
      for (let i = 0; i < data.length; i++) {
        if(this.username == data[i].username){
          this.dadosUser = data[i];
          if(data[i].adminUser == true){
            adminUser = true;
          }
        }
      }
      if(adminUser){
        this.acessarDadosTelaAdmin = true;
      } else {
        this.acessarDadosTelaAdmin = false;
        this.buscarDados();
      }
    },
      error => {
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: error, life: 3000});
      }
    );
  }

  buscarDados(){
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
            "state": "Exemplo",
            "city": "Exemplo",
            "zipCode": "Exemplo",
            "complement": "Exemplo",
            "status": "EXEMPLO",
            "username":"Exemplo",
            "motive":"Exemplo"
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

  deletarDados(dados:any){
    this.menuAcessoService.deletarDados(dados.id).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Excluido.', life: 3000});
      this.buscarDados();
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  desativarDado(dado:any){
    dado.status = 'INATIVO';
    this.menuAcessoService.alterarDados(dado).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Desativado.', life: 3000});
      this.buscarDados();
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  ativarConta(){
    this.botaoBloqueado = true;
    this.dadosUser.status = 'Ativo';
    this.menuAcessoService.alterarUsername(this.dadosUser).subscribe(
      response => {
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: "Seu usuário foi ativado.", life: 3000});
        this.carregando = true;
        this.value = 0;
        this.ngOnInit();
        setTimeout(() => {
          this.botaoBloqueado = false;
        }, 1000);
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  desativarConta(){
    this.botaoBloqueado = true;
    this.dadosUser.status = 'Inativo';
    this.menuAcessoService.alterarUsername(this.dadosUser).subscribe(
      response => {
        this.buscarEstabelecimentos();
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  async buscarEstabelecimentos(){
    try{
      let data = await firstValueFrom(this.menuAcessoService.buscarDados(this.userId));
      if (data) {  
        for (let i = 0; i < data.length; i++) {
          await this.desativarEstabelecimentos(data[i])          
        }  
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: "Seu Usuário foi desativado e todos os lugares cadastrados.", life: 3000});
        this.carregando = true;
        this.value = 0;
        this.ngOnInit();
        setTimeout(() => {
          this.botaoBloqueado = false;
        }, 1000);
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

}
