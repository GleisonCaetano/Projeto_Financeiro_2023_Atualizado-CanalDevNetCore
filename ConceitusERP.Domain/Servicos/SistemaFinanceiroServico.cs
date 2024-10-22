﻿using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using ConceitusERP.Domain.Interfaces.ISistemaFinanceiro;

namespace ConceitusERP.Domain.Servicos
{
    public class SistemaFinanceiroServico : ISistemaFinanceiroServico
    {
        private readonly InterfaceSistemaFinanceiro _interfaceSistemaFinanceiro;

        public SistemaFinanceiroServico(InterfaceSistemaFinanceiro interfaceSistemaFinanceiro)
        {
            _interfaceSistemaFinanceiro = interfaceSistemaFinanceiro;
        }

        public async Task AdicionarSistemaFinanceiro(SistemaFinanceiro sistemaFinanceiro)
        {
            var valido = sistemaFinanceiro.StringPropertyValidation(sistemaFinanceiro.Nome, "Nome");

            if (valido)
            {
                var data = DateTime.UtcNow;

                sistemaFinanceiro.DiaFechamento = 1;
                sistemaFinanceiro.Ano = data.Year;
                sistemaFinanceiro.Mes = data.Month;
                sistemaFinanceiro.AnoCopia = data.Year;
                sistemaFinanceiro.MesCopia = data.Month;
                sistemaFinanceiro.GerarCopiaDespesa = true;

                await _interfaceSistemaFinanceiro.Add(sistemaFinanceiro);
            }
        }

        public async Task AtualizarSistemaFinanceiro(SistemaFinanceiro sistemaFinanceiro)
        {
            var valido = sistemaFinanceiro.StringPropertyValidation(sistemaFinanceiro.Nome, "Nome");

            if (valido)
            {
                //sistemaFinanceiro.DiaFechamento = 1;

                await _interfaceSistemaFinanceiro.Update(sistemaFinanceiro);
            }
        }
    }
}
