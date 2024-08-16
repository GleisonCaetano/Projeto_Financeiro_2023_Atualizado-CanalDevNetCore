import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Categoria } from "../models/CategoriaModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService{
    private readonly baseUrl = environment["endPoint"];
    
    constructor(private httpClient: HttpClient){}

    AdicionarCategoria(categoria: Categoria){
        return this.httpClient.post<Categoria>(`${this.baseUrl}/AdicionarCategoria`, categoria);
    }

    ListarCategoriasUsuario(emailUsuario: string) : Observable<Array<Categoria>>{
        return this.httpClient.get<Array<Categoria>>(`${this.baseUrl}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`);
    }

    ObterCategoria(id: number) : Observable<Categoria> {
        return this.httpClient.get<Categoria>(`${this.baseUrl}/ObterCategoria?id=${id}`);
    }

    AtualizarCategoria(categoria: Categoria){
        return this.httpClient.put<Categoria>(`${this.baseUrl}/AtualizarCategoria`, categoria);
    }
}