import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiroModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SistemaService{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient){}

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro){
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/AdicionarSistemaFinanceiro`, sistemaFinanceiro);
    }

    ListarSistemasUsuario(emailUsuario: string) : Observable<Array<SistemaFinanceiro>> {
        return this.httpClient.get<Array<SistemaFinanceiro>>(`${this.baseUrl}/ListarSistemasUsuario?emailUsuario=${emailUsuario}`);
    }

    CadastrarUsuarioNoSistema(sistemaId: number, emailUsuario: string){
        return this.httpClient.post<any>(`${this.baseUrl}/CadastrarUsuarioNoSistema?sistemaId=${sistemaId}&emailUsuario=${emailUsuario}`, null);
    }
}