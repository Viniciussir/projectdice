import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosEstabelecimento } from './menu-acesso-filtro';

@Injectable()
export class MenuAcessoService {

    constructor(private http: HttpClient) { }

    getDadosEstabelecimento() {
        return this.http.get<any>('../../../assets/dadosEstabelecimento.json').toPromise()
        .then(res => <DadosEstabelecimento[]>res.data)
        .then(data => { 
            return data; 
        });
    }
}