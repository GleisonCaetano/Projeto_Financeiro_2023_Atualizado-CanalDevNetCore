import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiroModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UsuarioSistemaFinanceiro {
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient) {}

    CadastrarUsuarioNoSistema(sistemaId: number, emailUsuario: string) {
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/CadastrarUsuarioNoSistema?sistemaId=${sistemaId}&emailUsuario=${emailUsuario}`, null);
    }

    ListarUsuariosSistema(sistemaId: number) : Observable<Array<SistemaFinanceiro>> {
        return this.httpClient.get<Array<SistemaFinanceiro>>(`${this.baseUrl}/ListarUsuariosSistema?sistemaId=${sistemaId}`);
    }

    DeletarUsuarioSistemaFinanceiro(id: number) {
        return this.httpClient.delete<SistemaFinanceiro>(`${this.baseUrl}/DeletarUsuarioSistemaFinanceiro?id=${id}`);
    }
}