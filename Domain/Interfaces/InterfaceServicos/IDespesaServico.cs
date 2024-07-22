using Domain.Entities;

namespace Domain.Interfaces.InterfaceServicos
{
    public interface IDespesaServico
    {
        Task AdicionarDespesa(Despesa despesa);
        Task AtualizarDespesa(Despesa despesa);
    }
}