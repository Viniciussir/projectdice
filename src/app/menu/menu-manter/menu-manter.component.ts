import { MessageService } from 'primeng/api';
import { DadosEstabelecimento } from '../service/menu-acesso-filtro';
import { MenuAcessoService } from '../service/menu-acesso.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operacao } from 'src/app/shared/operacao';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { firstValueFrom } from 'rxjs';

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
  selecaoHorarioFuncionamento: any = {};

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

  listaCidade:any [] = [];
  selecaoCidadesUF:any = '';

  exibirDialogMotivo:boolean = false;

  exibirDialogHorarioFuncionamento:boolean = false;

  selecaoSituacao:any = {}; 

  cssCheck:string = "pi pi-check"

  constructor(
    private messageService: MessageService,
    private menuAcessoService : MenuAcessoService,
    private http: HttpClient,
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyA09PislmzgpeWIf1VpR-iTro0rhz5DuCU",
      authDomain: "dice-99070.firebaseapp.com",
      databaseURL: "https://dice-99070-default-rtdb.firebaseio.com",
      projectId: "dice-99070",
      storageBucket: "dice-99070.appspot.com",
      messagingSenderId: "151222719461",
      appId: "1:151222719461:web:170fc9f1db98ba9b7a550c"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async ngOnInit() {
    await this.obterCidades();
    if(this.operacao == Operacao.ALTERAR || this.operacao == Operacao.DETALHAR || this.operacao == Operacao.ADMIN){
      this.buscarDados(this.userId);
    } else {
      this.dadosEstabelecimento.number = null;
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
      let data = await firstValueFrom(this.menuAcessoService.buscarDados(id));
      if (data) {  
        for (let i = 0; i < data.length; i++) {
          if(data[i].id == this.id){
            this.ajustarObjetosDropdown(data[i]);
            this.verificaMotivoRejeicao(data[i]);
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
    this.horarioFuncionamento = dados.openingHours
    for (let i = 0; i < dados.image.length; i++) {
      const url = dados.image[i];
      const regex = /\/imagem%2F(.*?)\?alt=/;
      const match = url.match(regex);
      this.uploadedFiles.push({
        "name":match[1],
        "url":dados.image[i]
      })        
    }
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
  }

  verificaMotivoRejeicao(dados:any){
    if(dados.motive){
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: dados.motive, life: 3000});
    }
  }
  //#endregion

  //#region upload Imagem
  uploadImage(event:any) {
    for (let i = 0; i < event.files.length; i++) {
      let name = event.files[i].name
      const file = event.files[i];
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const uploadTask = storageRef.child('imagem/' + file.name).put(file);  
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, error => {
        console.error('Erro ao fazer o upload da imagem: ', error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          const existe = this.uploadedFiles.some(item => item.name === name);
          if (!existe) {
            this.uploadedFiles.push({
              "url": url,
              "name": name,
            });
          }
        });
      });
    }
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: "Upload concluído", life: 3000});
  }

  removeImage(event:any){
    const file = event;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const fileRef = storageRef.child('imagem/' + file.name);
    fileRef.delete().then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: "Imagem removida", life: 3000});
      const index = this.uploadedFiles.findIndex(item => item.name === event.name);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
      }
    }).catch(() => {
      const index = this.uploadedFiles.findIndex(item => item.name === event.name);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
      }
    });
  }

  removefile(event:any){
    const file = event.file;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const fileRef = storageRef.child('imagem/' + file.name);
    fileRef.delete().then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: "Imagem removida", life: 3000});
      const index = this.uploadedFiles.findIndex(item => item.name === event.file.name);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
      }
    }).catch((error) => {
      const index = this.uploadedFiles.findIndex(item => item.name === event.file.name);
      if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
      }
    });
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
      if(this.horarioFuncionamento[i].Situacao){
        if(this.horarioFuncionamento[i].Situacao == "Aberto"){
          const padraoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          if (!padraoHora.test(this.horarioFuncionamento[i].horaInicial) || !padraoHora.test(this.horarioFuncionamento[i].horaFinal)) {
            this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o campo Horário informado no accordion de Horário de Funcionamento.', life: 3000});
            return false;
          }
        } else if (this.horarioFuncionamento[i].Situacao == "Fechado"){
          this.horarioFuncionamento[i].horaInicial = '';
          this.horarioFuncionamento[i].horaFinal = '';
        } else {
          this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o campo Situação no accordion de Horário de Funcionamento.', life: 3000});
          return false;
        }
      } else {
        this.messageService.add({severity:'warn', summary: 'Validar campo obrigatório', detail: 'Verique o accordion de Horário de Funcionamento.', life: 3000});
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
        "horaInicial": this.horarioFuncionamento[i].horaInicial,
        "horaFinal": this.horarioFuncionamento[i].horaFinal,
        "Situacao": this.horarioFuncionamento[i].Situacao,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" :  this.uploadedFiles.map(item => item.url),
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
        "horaInicial": this.horarioFuncionamento[i].horaInicial,
        "horaFinal": this.horarioFuncionamento[i].horaFinal,
        "Situacao": this.horarioFuncionamento[i].Situacao,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" :  this.uploadedFiles.map(item => item.url),
      "openingHours": horario,
      "street": this.dadosEstabelecimento.street,
      "number" : this.dadosEstabelecimento.number,
      "district" : this.dadosEstabelecimento.district,
      "city" : this.selecaoCidadesUF.code,
      "zipCode" : this.dadosEstabelecimento.zipCode,
      "complement" : this.dadosEstabelecimento.complement,
      "status" : "ATIVO",
      "username" : this.username,
      "motive" : "",
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
        "horaInicial": this.horarioFuncionamento[i].horaInicial,
        "horaFinal": this.horarioFuncionamento[i].horaFinal,
        "Situacao": this.horarioFuncionamento[i].Situacao,
      })
    }
    let dados = {
      "id" : this.id,
      "userId" : this.userId,
      "name": this.dadosEstabelecimento.name,
      "description": this.dadosEstabelecimento.description,
      "categories" : this.dadosEstabelecimento.categories.map(item => item.name),
      "basicInformation" : this.dadosEstabelecimento.basicInformation.map(item => item.name),
      "image" :  this.uploadedFiles.map(item => item.url),
      "openingHours": horario,
      "street": this.dadosEstabelecimento.street,
      "number" : this.dadosEstabelecimento.number,
      "district" : this.dadosEstabelecimento.district,
      "city" : this.selecaoCidadesUF.code,
      "zipCode" : this.dadosEstabelecimento.zipCode,
      "complement" : this.dadosEstabelecimento.complement,
      "status" : "REJEITADO",
      "username" : this.username,
      "motive" : this.dadosEstabelecimento.motive,
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

  //#region Horario de Funcionamento
  editarHorario(horario:any){
    this.selecaoHorarioFuncionamento = horario;
    if(horario.Situacao == "Aberto") {
      this.selecaoSituacao = true;
    } else {
      this.selecaoSituacao = false;
    }
    this.exibirDialogHorarioFuncionamento = true;
  }

  salvarHorario(selecaoHorario:any){
    for (let i = 0; i < this.horarioFuncionamento.length; i++) {
      if(this.horarioFuncionamento[i].dia == selecaoHorario.dia){
        this.horarioFuncionamento[i] = selecaoHorario;
      }      
    }
    this.exibirDialogHorarioFuncionamento = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Horario de Funcionamento Atualizado.', life: 3000});
  }

  selecionarSituacao(situacao:any){
    if(situacao){
      this.selecaoHorarioFuncionamento.Situacao = "Aberto";
    } else {
      this.selecaoHorarioFuncionamento.Situacao = "Fechado";
      this.selecaoHorarioFuncionamento.horaInicial = "";
      this.selecaoHorarioFuncionamento.horaFinal = "";
    }
  }
  //#endregion
}
