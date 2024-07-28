import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MenuService{
    menuSelecionado: number=0;
    
    constructor(){}
}