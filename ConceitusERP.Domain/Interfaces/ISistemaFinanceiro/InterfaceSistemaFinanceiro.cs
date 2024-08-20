using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.Generics;

namespace ConceitusERP.Domain.Interfaces.ISistemaFinanceiro
{
    public interface InterfaceSistemaFinanceiro : InterfaceGenerica<SistemaFinanceiro>
    {
        Task<IList<SistemaFinanceiro>> ListarSistemasUsuario(string emailUsuario);
        Task<bool> ExecutarCopiaDespesasSistemaFinanceiro();
    }
}