using Domain.Entities;
using Domain.Interfaces.Generics;

namespace Domain.Interfaces.ISistemaFinanceiro
{
    public interface InterfaceSistemaFinanceiro : InterfaceGenerica<SistemaFinanceiro>
    {
        Task<IList<SistemaFinanceiro>> ListarSistemasUsuario(string emailUsuario);
    }
}