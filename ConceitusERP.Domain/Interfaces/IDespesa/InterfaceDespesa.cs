using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.Generics;

namespace ConceitusERP.Domain.Interfaces.IDespesa
{
    public interface InterfaceDespesa : InterfaceGenerica<Despesa>
    {
        Task<IList<Despesa>> ListarDespesasUsuario(string emailUsuario);

        Task<IList<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores(string emailUsuario);
    }
}