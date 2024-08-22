import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Despesa } from "../models/DespesaModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DespesaService{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient){}

    AdicionarDespesa(despesa: Despesa){
        return this.httpClient.post<Despesa>(`${this.baseUrl}/AdicionarDespesa`, despesa);
    }

    ListarDespesasUsuario(emailUsuario: string) : Observable<Array<Despesa>>{
        return this.httpClient.get<Array<Despesa>>(`${this.baseUrl}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`);
    }

    ObterDespesa(id: number) : Observable<Despesa> {
        return this.httpClient.get<Despesa>(`${this.baseUrl}/ObterDespesa?id=${id}`);
    }

    AtualizarDespesa(despesa: Despesa) {
        return this.httpClient.put<Despesa>(`${this.baseUrl}/AtualizarDespesa`, despesa);
    }

    CarregarGraficos(emailUsuario: string) : Observable<Array<Despesa>>{
        return this.httpClient.get<Array<Despesa>>(`${this.baseUrl}/CarregarGraficos?emailUsuario=${emailUsuario}`);
    }
}