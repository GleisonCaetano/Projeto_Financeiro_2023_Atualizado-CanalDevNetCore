export class SistemaFinanceiro{
    id: number = 0;
    nome: string = "";
    mes: number = 0;
    ano: number = 0;
    diaFechamento: number = 0;
    gerarCopiaDespesa: boolean = true;
    mesCopia: number = 0;
    anoCopia: number = 0;
    excluido: boolean = false;

    NomePropriedade: string = "";
    Mensagem: string = "";
}