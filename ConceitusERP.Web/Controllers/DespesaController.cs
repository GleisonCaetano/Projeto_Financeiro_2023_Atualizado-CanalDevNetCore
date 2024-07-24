using ConceitusERP.Domain.Servicos;
using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.ICategoria;
using ConceitusERP.Domain.Interfaces.IDespesa;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using Microsoft.AspNetCore.Mvc;

namespace ConceitusERP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesaController : ControllerBase
    {
        private readonly InterfaceDespesa _interfaceDespesa;
        private readonly IDespesaServico _iDespesaServico;

        public DespesaController(InterfaceDespesa interfaceDespesa, IDespesaServico iDespesaServico)
        {
            _interfaceDespesa = interfaceDespesa;
            _iDespesaServico = iDespesaServico;
        }

        [HttpGet("/api/ListarDespesasUsuario")]
        [Produces("application/json")]
        public async Task<object> ListarDespesasUsuario(string emailUsuario)
        {
            return await _interfaceDespesa.ListarDespesasUsuario(emailUsuario);
        }

        [HttpPost("/api/AdicionarDespesa")]
        [Produces("application/json")]
        public async Task<object> AdicionarDespesa(Despesa despesa)
        {
            await _iDespesaServico.AdicionarDespesa(despesa);

            return despesa;
        }

        [HttpPut("/api/AtualizarDespesa")]
        [Produces("application/json")]
        public async Task<object> AtualizarDespesa(Despesa despesa)
        {
            await _iDespesaServico.AtualizarDespesa(despesa);

            return despesa;
        }

        [HttpGet("/api/ObterDespesa")]
        [Produces("application/json")]
        public async Task<object> ObterDespesa(int id)
        {
            return await _interfaceDespesa.GetById(id);
        }

        [HttpDelete("/api/DeletarDespesa")]
        [Produces("application/json")]
        public async Task<object> DeletarDespesa(int id)
        {
            try
            {
                var despesa = await _interfaceDespesa.GetById(id);

                await _interfaceDespesa.Delete(despesa);
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        [HttpGet("/api/CarregarGraficos")]
        [Produces("application/json")]
        public async Task<object> CarregarGraficos(string emailUsuario)
        {
            return await _iDespesaServico.CarregarGraficos(emailUsuario);
        }
    }
}
