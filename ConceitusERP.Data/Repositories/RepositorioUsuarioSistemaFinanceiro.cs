using ConceitusERP.Data.Configuration;
using ConceitusERP.Data.Repositories.Generics;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Microsoft.EntityFrameworkCore;

namespace ConceitusERP.Data.Repositories
{
    public class RepositorioUsuarioSistemaFinanceiro : RepositorioGenerico<UsuarioSistemaFinanceiro>, InterfaceUsuarioSistemaFinanceiro
    {
        private readonly DbContextOptions<ContextBase> _optionsBuilder;

        public RepositorioUsuarioSistemaFinanceiro()
        {
            _optionsBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<UsuarioSistemaFinanceiro>> ListarUsuariosSistema(int IdSistema)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    banco.UsuarioSistemaFinanceiro
                    .Where(s => s.SistemaId == IdSistema)
                    .AsNoTracking().ToListAsync();
            }
        }

        public async Task<UsuarioSistemaFinanceiro> ObterUsuarioPorEmail(string emailUsuario)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    banco.UsuarioSistemaFinanceiro
                    .AsNoTracking().FirstOrDefaultAsync(x => x.EmailUsuario.Equals(emailUsuario));
            }
        }

        public async Task RemoverUsuarios(List<UsuarioSistemaFinanceiro> usuarios)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                banco.UsuarioSistemaFinanceiro.RemoveRange(usuarios);

                await banco.SaveChangesAsync();
            }
        }
    }
}
