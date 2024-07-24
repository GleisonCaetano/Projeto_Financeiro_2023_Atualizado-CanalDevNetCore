using ConceitusERP.Data.Configuration;
using ConceitusERP.Data.Repositories.Generics;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.ISistemaFinanceiro;
using Microsoft.EntityFrameworkCore;

namespace ConceitusERP.Data.Repositories
{
    public class RepositorioSistemaFinanceiro : RepositorioGenerico<SistemaFinanceiro>, InterfaceSistemaFinanceiro
    {
        private readonly DbContextOptions<ContextBase> _optionsBuilder;

        public RepositorioSistemaFinanceiro()
        {
            _optionsBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<SistemaFinanceiro>> ListarSistemasUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiro
                     join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.SistemaId
                     where us.EmailUsuario.Equals(emailUsuario)
                     select s).AsNoTracking().ToListAsync();
            }
        }
    }
}
