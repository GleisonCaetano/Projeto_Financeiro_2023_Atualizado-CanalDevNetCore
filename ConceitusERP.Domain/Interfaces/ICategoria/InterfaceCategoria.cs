using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.Generics;

namespace ConceitusERP.Domain.Interfaces.ICategoria
{
    public interface InterfaceCategoria : InterfaceGenerica<Categoria>
    {
        Task<IList<Categoria>> ListarCategoriasUsuario(string emailUsuario);
    }
}