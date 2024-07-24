using ConceitusERP.Data.Configuration;
using ConceitusERP.Data.Repositories.Generics;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.IDespesa;
using Microsoft.EntityFrameworkCore;

namespace ConceitusERP.Data.Repositories
{
    public class RepositorioDespesa : RepositorioGenerico<Despesa>, InterfaceDespesa
    {
        private readonly DbContextOptions<ContextBase> _optionsBuilder;

        public RepositorioDespesa()
        {
            _optionsBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<Despesa>> ListarDespesasUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiro
                     join c in banco.Categoria on s.Id equals c.SistemaId
                     join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.SistemaId
                     join d in banco.Despesa on c.Id equals d.CategoriaId
                     where us.EmailUsuario.Equals(emailUsuario) && s.Mes == d.Mes && s.Ano == d.Ano
                     select d).AsNoTracking().ToListAsync();
            }
        }

        public async Task<IList<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores(string emailUsuario)
        {
            using (var banco = new ContextBase(_optionsBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiro
                     join c in banco.Categoria on s.Id equals c.SistemaId
                     join us in banco.UsuarioSistemaFinanceiro on s.Id equals us.SistemaId
                     join d in banco.Despesa on c.Id equals d.CategoriaId
                     where us.EmailUsuario.Equals(emailUsuario) && d.Mes < DateTime.Now.Month && !d.Pago
                     select d).AsNoTracking().ToListAsync();
            }
        }
    }
}
