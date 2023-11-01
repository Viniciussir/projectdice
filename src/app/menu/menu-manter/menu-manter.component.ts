import { MessageService } from 'primeng/api';
import { DadosEstabelecimento } from '../service/menu-acesso-filtro';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-manter',
  templateUrl: './menu-manter.component.html',
  styleUrls: ['./menu-manter.component.scss']
})
export class MenuManterComponent implements OnInit {

  @Input() desabilitarCamposManter:any;
  @Input() acessarDadosTelaManter:any;
  @Input() realizaInclusao:any;
  @Input() username:any;
  @Input() nomeEstabelecimento:any;

  dadosEstabelecimento:DadosEstabelecimento = new DadosEstabelecimento();

  horarioFuncionamento:any = '';

  uploadedFiles: any[] = [];
  
  listaCategorias:any [] = [
    {name: 'Restaurante', code: 'Restaurante'},
    {name: 'Parques', code: 'Parques'},
    {name: 'Baladas', code: 'Baladas'},
    {name: 'Cinemas', code: 'Cinemas'},
    {name: 'Shoppings', code: 'Shoppings'},
    {name: 'Cafeterias', code: 'Cafeterias'},
    {name: 'Teatro', code: 'Teatro'},
    {name: 'Museus', code: 'Museus'},
    {name: 'Zoológico', code: 'Zoológico'},
  ];

  listaInformacoesBasicas:any [] = [
    {name: 'Estacionamento', code: 'Estacionamento'},
    {name: 'Ambiente para Fumantes', code: 'Ambiente para Fumantes'},
  ];

  listaHorarios:any [] = [
    { "code": "01:00", "name": "01:00" },
    { "code": "01:30", "name": "01:30" },
    { "code": "02:00", "name": "02:00" },
    { "code": "02:30", "name": "02:30" },
    { "code": "03:00", "name": "03:00" },
    { "code": "03:30", "name": "03:30" },
    { "code": "04:00", "name": "04:00" },
    { "code": "04:30", "name": "04:30" },
    { "code": "05:00", "name": "05:00" },
    { "code": "05:30", "name": "05:30" },
    { "code": "06:00", "name": "06:00" },
    { "code": "06:30", "name": "06:30" },
    { "code": "07:00", "name": "07:00" },
    { "code": "07:30", "name": "07:30" },
    { "code": "08:00", "name": "08:00" },
    { "code": "08:30", "name": "08:30" },
    { "code": "09:00", "name": "09:00" },
    { "code": "09:30", "name": "09:30" },
    { "code": "10:00", "name": "10:00" },
    { "code": "10:30", "name": "10:30" },
    { "code": "11:00", "name": "11:00" },
    { "code": "11:30", "name": "11:30" },
    { "code": "12:00", "name": "12:00" },
    { "code": "12:30", "name": "12:30" },
    { "code": "13:00", "name": "13:00" },
    { "code": "13:30", "name": "13:30" },
    { "code": "14:00", "name": "14:00" },
    { "code": "14:30", "name": "14:30" },
    { "code": "15:00", "name": "15:00" },
    { "code": "15:30", "name": "15:30" },
    { "code": "16:00", "name": "16:00" },
    { "code": "16:30", "name": "16:30" },
    { "code": "17:00", "name": "17:00" },
    { "code": "17:30", "name": "17:30" },
    { "code": "18:00", "name": "18:00" },
    { "code": "18:30", "name": "18:30" },
    { "code": "19:00", "name": "19:00" },
    { "code": "19:30", "name": "19:30" },
    { "code": "20:00", "name": "20:00" },
    { "code": "20:30", "name": "20:30" },
    { "code": "21:00", "name": "21:00" },
    { "code": "21:30", "name": "21:30" },
    { "code": "22:00", "name": "22:00" },
    { "code": "22:30", "name": "22:30" },
    { "code": "23:00", "name": "23:00" },
    { "code": "23:30", "name": "23:30" },
    { "code": "00:00", "name": "00:00" },
    { "code": "00:30", "name": "00:30" }
  ];

  listaSituacao:any [] = [
    {name: 'Aberto', code: 'Aberto'},
    {name: 'Fechado', code: 'Fechado'},
  ]

  listaCidade:any [] = [];
  selecaoCidadesUF:any = '';

  constructor(
    private messageService: MessageService,
    private menuAcessoService : MenuAcessoService) { }

  async ngOnInit() {
    await this.obterCidades();
    if(!this.realizaInclusao){
      this.detalharDados(this.nomeEstabelecimento);
    } else {
      this.horarioFuncionamento = [
        {
					"id": "1",
					"dia": "Segunda-Feira",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "2",
					"dia": "Terça-Feira",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "3",
					"dia": "Quarta-Feira",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "4",
					"dia": "Quinta-Feira",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "5",
					"dia": "Sexta-Feira",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "6",
					"dia": "Sabado",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				},
				{
					"id": "7",
					"dia": "Domingo",
					"horaInicial": "",
					"horaFinal": "",
					"Situacao": ""
				}
      ]
    }
  }

  async detalharDados(id:any){
    try{
      let data = await this.menuAcessoService.detalharDados(id).toPromise();
      if (data) {  
        this.dadosEstabelecimento = data;
      } else {
        console.error('A chamada à API retornou um valor indefinido.');
      }
    }
    catch(error){}
  } 

  async obterCidades() {
    try {
      const cidades = await this.menuAcessoService.getCidades('SP').toPromise();
      if (cidades) {
        const lista: any[] = [];
  
        for (let i = 0; i < cidades.length; i++) {
          lista.push({
            'code': cidades[i].nome + " - " + cidades[0].microrregiao.mesorregiao.UF.sigla,
            'name': cidades[i].nome + " - " + cidades[0].microrregiao.mesorregiao.UF.sigla,
          });
        }
  
        this.listaCidade = lista;
      } else {
        console.error('A chamada à API retornou um valor indefinido.');
      }
    } catch (error) {
      console.error('Erro na chamada da API:', error);
      throw error;
    }
  }

  preencherValoresHorarioFuncionamento(dados:any){
    this.horarioFuncionamento = dados.horarioFuncionamento;
  }

  onUpload(event:any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target) {
            this.uploadedFiles.push({ url: e.target.result });
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }

  voltar(){
    this.acessarDadosTelaManter = false;
  }

  selecionarCidadeUf(){
    if(this.selecaoCidadesUF){
      this.dadosEstabelecimento.cidadeUf = this.selecaoCidadesUF.name;
    } else {
      this.dadosEstabelecimento.cidadeUf = '';
    } 
  }

  adicionarNovosDados() {
    this.menuAcessoService.adicionarDados(this.dadosEstabelecimento).subscribe(response => {
        console.log('Dados adicionados com sucesso:', response);
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      });
  }

}
