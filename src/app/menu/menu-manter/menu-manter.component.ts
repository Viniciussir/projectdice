import { MessageService } from 'primeng/api';
import { DadosEstabelecimento } from '../service/menu-acesso-filtro';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operacao } from 'src/app/shared/operacao';

@Component({
  selector: 'app-menu-manter',
  templateUrl: './menu-manter.component.html',
  styleUrls: ['./menu-manter.component.scss']
})
export class MenuManterComponent implements OnInit {

  @Input() desabilitarCamposManter:any;
  @Input() acessarDadosTelaManter:any;
  @Input() operacao:any;
  @Input() username:any;
  @Input() userId:any;
  @Input() id:any;

  dadosEstabelecimento:DadosEstabelecimento = new DadosEstabelecimento();

  horarioFuncionamento:any[] = [
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
  ];

  uploadedFiles: any[] = [];
  
  listaCategorias:any [] = [
    {name: 'Bares', code: 'Bares'},
    {name: 'Restaurante', code: 'Restaurante'},
    {name: 'Pub', code: 'Pub'},
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
    {name: 'Musica ao vivo', code: 'Musica ao vivo'},
    {name: 'Estacionamento', code: 'Estacionamento'},
    {name: 'Ambiente para Fumantes', code: 'Ambiente para Fumantes'},
    {name: 'Refeição no Local', code: 'Refeição no Local'},
    {name: 'Para viagem', code: 'Para viagem'},
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

  exibirDialogMotivo:boolean = false;

  constructor(
    private messageService: MessageService,
    private menuAcessoService : MenuAcessoService,) { }

  async ngOnInit() {
    await this.obterCidades();
    if(this.operacao == Operacao.ALTERAR || this.operacao == Operacao.DETALHAR || this.operacao == Operacao.ADMIN){
      this.buscarDados(this.userId);
    }
  }

  //#region Combo cidade
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

  selecionarCidadeUf(){
    if(this.selecaoCidadesUF){
      this.dadosEstabelecimento.city = this.selecaoCidadesUF.name;
    } else {
      this.dadosEstabelecimento.city = '';
    } 
  }
  //#endregion

  //#region Obter Dados alterar, detalhar e admin
  async buscarDados(id:any){
    try{
      let data = await this.menuAcessoService.buscarDados(id).toPromise();
      if (data) {  
        for (let i = 0; i < data.length; i++) {
          if(data[i].id == this.id){
            this.ajustarObjetosDropdown(data[i]);
          }          
        }  
      } else {
        console.error('A chamada à API retornou um valor indefinido.');
      }
    }
    catch(error:any){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: error, life: 3000});
    }
  } 

  ajustarObjetosDropdown(dados:any){
    this.dadosEstabelecimento = dados;
    if(dados.categories){
      let categories:any [] = [];
      for (let i = 0; i < dados.categories.length; i++) {
        categories.push({
          code: dados.categories[i],
          name: dados.categories[i]
        })        
      }
      this.dadosEstabelecimento.categories = categories;
    }
    if(dados.basicInformation){
      let basicInformation:any [] = [];
      for (let i = 0; i < dados.basicInformation.length; i++) {
        basicInformation.push({
          code: dados.basicInformation[i],
          name: dados.basicInformation[i]
        })        
      }
      this.dadosEstabelecimento.basicInformation = basicInformation;
    }
    if(dados.city){
      this.selecaoCidadesUF = {
        code: dados.city,
        name: dados.city
      }      
    }
    if(dados.openingHours){
      this.horarioFuncionamento = [];
      for (let i = 0; i < dados.openingHours.length; i++) {
        this.horarioFuncionamento.push({
          id: dados.openingHours[i].id,
          dia: dados.openingHours[i].dia,
          horaInicial: {
            code: dados.openingHours[i].horaInicial,
            name:dados.openingHours[i].horaInicial
          },
          horaFinal: {
            code: dados.openingHours[i].horaFinal,
            name:dados.openingHours[i].horaFinal
          },
          Situacao: {
            code: dados.openingHours[i].Situacao,
            name:dados.openingHours[i].Situacao
          }
        })        
      }
    }
  }
  //#endregion

  //#region upload Imagem
  onUpload(event:any) {
    const files = event.files;
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
  //#endregion

  //#region Voltar
  voltar(){
    this.acessarDadosTelaManter = false;
  }
  //#endregion

  //#region Salvar 
  salvar(){
    if(!this.validarCampos()){
    } else {
      if(this.operacao == Operacao.INCLUIR){
        this.gravar(Operacao.INCLUIR);
      } else if (this.operacao == Operacao.ALTERAR)
      this.gravar(Operacao.ALTERAR);
    }
  }

  validarCampos(){
    if(!this.dadosEstabelecimento.name || !this.dadosEstabelecimento.description || this.dadosEstabelecimento.categories.length == 0){
      this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o accordion de Dados Gerais.', life: 3000});
      return false;
    } else if(this.uploadedFiles.length == 0){
      this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique as imagens informadas.', life: 3000});
      return false;
    } else if(!this.dadosEstabelecimento.street || !this.dadosEstabelecimento.number || !this.dadosEstabelecimento.district 
      || !this.dadosEstabelecimento.city || !this.dadosEstabelecimento.zipCode){
        this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o accordion de Endereço.', life: 3000});
      return false;
    }
    for (let i = 0; i < this.horarioFuncionamento.length; i++) {
      if(!this.horarioFuncionamento[i].horaInicial || !this.horarioFuncionamento[i].horaFinal || !this.horarioFuncionamento[i].Situacao){
        this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o accordion de horario de funcionamento.', life: 3000});
        return false;
      }
    }
    return true;
  }

  gravar(tipoOperacao:any) {
    let horario:any [] = [];
    for (let i = 0; i < this.horarioFuncionamento.length; i++) {
      horario.push({
        "id": this.horarioFuncionamento[i].id,
        "dia": this.horarioFuncionamento[i].dia,
        "horaInicial": this.horarioFuncionamento[i].horaInicial.code,
        "horaFinal": this.horarioFuncionamento[i].horaFinal.code,
        "Situacao": this.horarioFuncionamento[i].Situacao.code,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" : [],
      "openingHours": horario,
      "street": this.dadosEstabelecimento.street,
      "number" : this.dadosEstabelecimento.number,
      "district" : this.dadosEstabelecimento.district,
      "city" : this.selecaoCidadesUF.code,
      "zipCode" : this.dadosEstabelecimento.zipCode,
      "complement" : this.dadosEstabelecimento.complement,
      "status" : "AGUARDANDO ANALISE",
      "username" : this.username,
      "motive" : "",
    }
    if(tipoOperacao == Operacao.INCLUIR){
      this.menuAcessoService.adicionarDados(dados).subscribe(response => {
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Salvo com sucesso.', life: 3000});
        setTimeout(() => {
          this.voltar();
        }, 1000);
        },
        error => {
          console.error('Erro ao adicionar dados:', error);
        }
      );
    } else if (tipoOperacao == Operacao.ALTERAR){
      this.menuAcessoService.alterarDados(dados).subscribe(response => {
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Salvo com sucesso.', life: 3000});
        setTimeout(() => {
          this.voltar();
        }, 1000);
      },
        error => {
          console.error('Erro ao adicionar dados:', error);
        }
      );
    }
  }
  //#endregion

  //#region Limpar Mensagem
  limparMensagem(){
    this.messageService.clear();
  }
  //#endregion

  //#region Manutenção Admin
  aprovar(){
    let horario:any [] = [];
    for (let i = 0; i < this.horarioFuncionamento.length; i++) {
      horario.push({
        "id": this.horarioFuncionamento[i].id,
        "dia": this.horarioFuncionamento[i].dia,
        "horaInicial": this.horarioFuncionamento[i].horaInicial.code,
        "horaFinal": this.horarioFuncionamento[i].horaFinal.code,
        "Situacao": this.horarioFuncionamento[i].Situacao.code,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" : "",
      "openingHours": horario,
      "street": this.dadosEstabelecimento.street,
      "number" : this.dadosEstabelecimento.number,
      "district" : this.dadosEstabelecimento.district,
      "city" : this.selecaoCidadesUF.code,
      "zipCode" : this.dadosEstabelecimento.zipCode,
      "complement" : this.dadosEstabelecimento.complement,
      "status" : "ATIVO"
    }
    this.menuAcessoService.alterarDados(dados).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Aprovado.', life: 3000});
        setTimeout(() => {
          this.voltar();
        }, 1000);
      },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }

  exibirMotivoReprova(event:any){
    this.exibirDialogMotivo = event;
  }

  reprovar(){
    this.exibirDialogMotivo = false;
    let horario:any [] = [];
    for (let i = 0; i < this.horarioFuncionamento.length; i++) {
      horario.push({
        "id": this.horarioFuncionamento[i].id,
        "dia": this.horarioFuncionamento[i].dia,
        "horaInicial": this.horarioFuncionamento[i].horaInicial.code,
        "horaFinal": this.horarioFuncionamento[i].horaFinal.code,
        "Situacao": this.horarioFuncionamento[i].Situacao.code,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" : "",
      "openingHours": horario,
      "street": this.dadosEstabelecimento.street,
      "number" : this.dadosEstabelecimento.number,
      "district" : this.dadosEstabelecimento.district,
      "city" : this.selecaoCidadesUF.code,
      "zipCode" : this.dadosEstabelecimento.zipCode,
      "complement" : this.dadosEstabelecimento.complement,
      "status" : "REJEITADO",
      "motive" : this.dadosEstabelecimento.motive
    }
    this.menuAcessoService.alterarDados(dados).subscribe(response => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Reprovado.', life: 3000});
      setTimeout(() => {
        this.voltar();
      }, 1000);
    },
      error => {
        console.error('Erro ao adicionar dados:', error);
      }
    );
  }
  //#endregion

}
