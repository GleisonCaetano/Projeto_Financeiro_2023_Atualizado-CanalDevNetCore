export class Despesa{
    id: number = 0;
    nome: string = "";
    valor: number = 0;
    mes: number = 0;
    ano: number = 0;
    tipoDespesa: number = 0;
    dataCadastro: Date = new Date();
    dataAlteracao: Date = new Date();
    dataPagamento: Date = new Date();
    dataVencimento: Date = new Date();
    pago: boolean = false;
    despesaAtrasada: boolean = false;
    categoriaId: number = 0;
    excluido: boolean = false;

    NomePropriedade: string = "";
    Mensagem: string = "";
}