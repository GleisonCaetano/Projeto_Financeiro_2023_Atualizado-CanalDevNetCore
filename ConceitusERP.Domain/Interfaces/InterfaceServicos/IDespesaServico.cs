using ConceitusERP.Domain.Entities;

namespace ConceitusERP.Domain.Interfaces.InterfaceServicos
{
    public interface IDespesaServico
    {
        Task AdicionarDespesa(Despesa despesa);
        Task AtualizarDespesa(Despesa despesa);
        Task<object> CarregarGraficos(string emailUsuario);
    }
}