using Domain.Entities;
using Domain.Interfaces.Generics;

namespace Domain.Interfaces.IDespesa
{
    public interface InterfaceDespesa : InterfaceGenerica<Despesa>
    {
        Task<IList<Despesa>> ListarDespesasUsuario(string emailUsuario);

        Task<IList<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores(string emailUsuario);
    }
}