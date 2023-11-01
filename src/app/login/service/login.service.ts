import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    adicionarUsername(dados: any): 
        Observable<any> {
        return this.http.post("https://65393dcfe3b530c8d9e82950.mockapi.io/api/dice/user", dados);
    }

    verificarUsername(): 
        Observable<any> {
        return this.http.get("https://65393dcfe3b530c8d9e82950.mockapi.io/api/dice/user");
    }

}