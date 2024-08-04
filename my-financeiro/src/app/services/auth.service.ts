import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private usuarioAutenticadoPortal: boolean = false;
    private token: any;
    private user: any;

    constructor(private httpClient: HttpClient){
    }

    checkToken(){
        return Promise.resolve(true);
    }

    //Salvar status que o usuário foi autenticado no portal
    usuarioAutenticado(status: boolean){
        localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
        this.usuarioAutenticadoPortal = status;
    }

    //Verificar se o usuário está autenticado e retornar para o chamador
    usuarioEstaAutenticado(): Promise<boolean> {
        this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') == 'true';
        return Promise.resolve(this.usuarioAutenticadoPortal);
    }

    //Setar o token no LocalStorage
    setToken(token: string) {
      localStorage.setItem('token', token);
      this.token = token;
    }

    //Pegar um usuário do LocalStorage
    get getToken() {
      this.token = localStorage.getItem('token');
      return this.token;
    }

    //Limpar as variáveis de Token e Usuário
    limparToken(){
        this.token = null;
        this.user = null;
    }

    //Limpar os dados do Usuário Logado ao sair do sistema
    limparDadosUsuario(){
        this.usuarioAutenticado(false);
        this.limparToken();
        localStorage.clear();
        sessionStorage.clear();
    }
}