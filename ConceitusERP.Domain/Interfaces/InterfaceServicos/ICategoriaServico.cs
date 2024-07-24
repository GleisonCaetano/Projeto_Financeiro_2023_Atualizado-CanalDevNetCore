using ConceitusERP.Domain.Entities;

namespace ConceitusERP.Domain.Interfaces.InterfaceServicos
{
    public interface ICategoriaServico
    {
        Task AdicionarCategoria(Categoria categoria);
        Task AtualizarCategoria(Categoria categoria);
    }
}