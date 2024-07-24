using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.IDespesa;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using ConceitusERP.Domain.Enums;

namespace ConceitusERP.Domain.Servicos
{
    public class DespesaServico : IDespesaServico
    {
        private readonly InterfaceDespesa _interfaceDespesa;

        public DespesaServico(InterfaceDespesa interfaceDespesa)
        {
            _interfaceDespesa = interfaceDespesa;
        }

        public async Task AdicionarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataCadastro = data;
            despesa.Ano = data.Year;
            despesa.Mes = data.Month;

            var valido = despesa.StringPropertyValidation(despesa.Nome, "Nome");

            if (valido)
                await _interfaceDespesa.Add(despesa);
        }

        public async Task AtualizarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataAlteracao = data;

            if (despesa.Pago)
                despesa.DataPagamento = data;

            var valido = despesa.StringPropertyValidation(despesa.Nome, "Nome");

            if (valido)
                await _interfaceDespesa.Update(despesa);
        }

        public async Task<object> CarregarGraficos(string emailUsuario)
        {
            var despesasUsuario = await _interfaceDespesa.ListarDespesasUsuario(emailUsuario);
            var despesasAnteriores = await _interfaceDespesa.ListarDespesasUsuarioNaoPagasMesesAnteriores(emailUsuario);

            var despesasNaoPagasMesesAnteriores = despesasAnteriores.Any() ?
                despesasAnteriores.ToList().Sum(x => x.Valor) : 0;

            var despesasPagas = despesasUsuario.Where(d => d.Pago && d.TipoDespesa == TipoDespesaEnum.Contas)
                .Sum(x => x.Valor);

            var despesasPendentes = despesasUsuario.Where(d => !d.Pago && d.TipoDespesa == TipoDespesaEnum.Contas)
                .Sum(x => x.Valor);

            var investimentos = despesasUsuario.Where(d => d.TipoDespesa == TipoDespesaEnum.Contas)
                .Sum(x => x.Valor);

            return new
            {
                sucesso = "OK",
                despesasPagas = despesasPagas,
                despesasPendentes = despesasPendentes,
                despesasNaoPagasMesesAnteriores = despesasNaoPagasMesesAnteriores,
                investimentos = investimentos
            };
        }
    }
}
