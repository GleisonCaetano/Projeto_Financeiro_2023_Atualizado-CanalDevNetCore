using Domain.Entities;
using Domain.Interfaces.ICategoria;
using Domain.Interfaces.InterfaceServicos;

namespace ConceitusERP.Domain.Servicos
{
    public class CategoriaServico : ICategoriaServico
    {
        private readonly InterfaceCategoria _interfaceCategoria;

        public CategoriaServico(InterfaceCategoria interfaceCategoria)
        {
            _interfaceCategoria = interfaceCategoria;
        }

        public async Task AdicionarCategoria(Categoria categoria)
        {
            var valido = categoria.StringPropertyValidation(categoria.Nome, "Nome");

            if (valido)
                await _interfaceCategoria.Add(categoria);
        }

        public async Task AtualizarCategoria(Categoria categoria)
        {
            var valido = categoria.StringPropertyValidation(categoria.Nome, "Nome");

            if (valido)
                await _interfaceCategoria.Update(categoria);
        }
    }
}
