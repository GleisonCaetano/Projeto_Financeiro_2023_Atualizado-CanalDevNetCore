using ConceitusERP.Data.Configuration;
using ConceitusERP.Data.Repositories.Generics;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.ICategoria;
using Microsoft.EntityFrameworkCore;

namespace ConceitusERP.Data.Repositories
{
    public class RepositorioCategoria : RepositorioGenerico<Categoria>, InterfaceCategoria
    {
        private readonly DbContextOptions<ContextBase> _optionsBuilder;

        public RepositorioCategoria()
        {
            _optionsBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<Categoria>> ListarCategoriasUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiro
                     join c in banco.Categoria on s.Id equals c.SistemaId
                     join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.SistemaId
                     where us.EmailUsuario.Equals(emailUsuario) && us.SistemaAtual
                     select c).AsNoTracking().ToListAsync();
            }
        }
    }
}
