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

        public async Task<bool> ExecutarCopiaDespesasSistemaFinanceiro()
        {
            var listaSistemaFinanceiro = new List<SistemaFinanceiro>();

            try
            {
                using (var banco = new ContextBase(_optionsBuilder))
                {
                    listaSistemaFinanceiro = await banco.SistemaFinanceiro.Where(s => s.GerarCopiaDespesa).ToListAsync();
                }

                foreach (var item in listaSistemaFinanceiro)
                {
                    using (var banco = new ContextBase(_optionsBuilder))
                    {
                        var dataAtual = DateTime.Now;
                        var mes = dataAtual.Month;
                        var ano = dataAtual.Year;

                        var despesaJaExiste = await ( from d in banco.Despesa
                                                      join c in banco.Categoria on d.CategoriaId equals c.Id
                                                      where c.SistemaId == item.Id && d.Mes == mes && d.Ano == ano
                                                      select d.Id).AnyAsync();
                    

                        if (!despesaJaExiste)
                        {
                            var despesasSistema = await ( from d in banco.Despesa
                                                        join c in banco.Categoria on d.CategoriaId equals c.Id
                                                        where c.SistemaId == item.Id && d.Mes == item.MesCopia && d.Ano == item.AnoCopia
                                                        select d).ToListAsync();

                            despesasSistema.ForEach(d => {
                                d.DataVencimento = new DateTime(ano, mes, d.DataVencimento.Day);
                                d.Mes = mes;
                                d.Ano = ano;
                                d.DataAlteracao = DateTime.MinValue;
                                d.DataCadastro = dataAtual;
                                d.DataPagamento = DateTime.MinValue;
                                d.Pago = false;
                            });

                            if (despesasSistema.Any())
                            {
                                banco.Despesa.AddRange(despesasSistema);
                                await banco.SaveChangesAsync();
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}
