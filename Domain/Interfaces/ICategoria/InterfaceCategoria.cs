using Domain.Entities;
using Domain.Interfaces.Generics;

namespace Domain.Interfaces.ICategoria
{
    public interface InterfaceCategoria : InterfaceGenerica<Categoria>
    {
        Task<IList<Categoria>> ListarCategoriasUsuario(string emailUsuario);
    }
}