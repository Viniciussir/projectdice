import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosEstabelecimento } from './menu-acesso-filtro';
import { Observable } from 'rxjs';

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

    getCidades(estado: string): Observable<any[]> {
        const url = `${'https://servicodados.ibge.gov.br/api/v1/localidades'}/estados/${estado}/municipios`;
        return this.http.get<any[]>(url);
    }

    adicionarDados(dados: any): 
        Observable<any> {
        return this.http.post("https://65393dcfe3b530c8d9e82950.mockapi.io/api/dice/dadosEstabelecimentos",dados);
    }

    detalharDados(dados: any): 
    Observable<any> {
    return this.http.get("https://65393dcfe3b530c8d9e82950.mockapi.io/api/dice/dadosEstabelecimentos",dados);
}

}