import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Despesa } from "../models/DespesaModel";

@Injectable({
    providedIn: 'root'
})

export class DespesaService{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient){}

    AdicionarDespesa(despesa: Despesa){
        return this.httpClient.post<Despesa>(`${this.baseUrl}/AdicionarDespesa`, despesa);
    }
}