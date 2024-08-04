export class SistemaFinanceiro{
    Id: number = 0;
    Nome: string = "";
    Mes: number = 0;
    Ano: number = 0;
    DiaFechamento: number = 0;
    GerarCopiaDespesa: boolean = true;
    MesCopia: number = 0;
    AnoCopia: number = 0;
    Excluido: boolean = false;

    NomePropriedade: string = "";
    Mensagem: string = "";
}