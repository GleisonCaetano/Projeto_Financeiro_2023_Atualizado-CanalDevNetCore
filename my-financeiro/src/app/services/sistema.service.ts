import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiroModel";

@Injectable({
    providedIn: 'root'
})

export class SistemaService{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient){}

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro){
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/AdicionarSistemaFinanceiro`, sistemaFinanceiro);
    }

    ListarSistemasUsuario(emailUsuario: string){
        return this.httpClient.get(`${this.baseUrl}/ListarSistemasUsuario?emailUsuario=${emailUsuario}`);
    }

    CadastratarUsuarioNoSistema(sistemaId: number, emailUsuario: string){
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/CadastratarUsuarioNoSistema?sistemaId=${sistemaId}&emailUsuario=${emailUsuario}`, null);
    }
}