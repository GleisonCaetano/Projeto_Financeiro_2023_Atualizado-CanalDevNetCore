import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Categoria } from "../models/CategoriaModel";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService{
    private readonly baseUrl = environment["endPoint"];
    
    constructor(private httpClient: HttpClient){}

    AdicionarCategoria(categoria: Categoria){
        return this.httpClient.post<Categoria>(`${this.baseUrl}/AdicionarCategoria`, categoria);
    }

    ListarCategoriasUsuario(emailUsuario: string){
        return this.httpClient.get(`${this.baseUrl}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`);
    }
}