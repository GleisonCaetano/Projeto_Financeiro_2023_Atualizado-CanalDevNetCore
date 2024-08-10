export class Despesa{
    Id: number = 0;
    Nome: string = "";
    Valor: number = 0;
    Mes: number = 0;
    Ano: number = 0;
    TipoDespesa: number = 0;
    DataCadastro: Date = new Date();
    DataAlteracao: Date = new Date();
    DataPagamento: Date = new Date();
    DataVencimento: Date = new Date();
    Pago: boolean = false;
    DespesaAtrasada: boolean = false;
    CategoriaId: number = 0;
    Excluido: boolean = false;

    NomePropriedade: string = "";
    Mensagem: string = "";
}