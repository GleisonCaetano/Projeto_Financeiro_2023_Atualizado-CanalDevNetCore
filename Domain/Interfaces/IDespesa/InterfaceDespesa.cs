using Domain.Entities;
using Domain.Interfaces.Generics;

namespace Domain.Interfaces.IDespesa
{
    public interface InterfaceDespesa : InterfaceGenerica<Despesa>
    {
        Task<IList<Despesa>> ListarDespesasUsusario(string emailUsuario);

        Task<IList<Despesa>> ListarDespesasUsusarioNaoPagasMesesAnteriores(string emailUsuario);
    }
}