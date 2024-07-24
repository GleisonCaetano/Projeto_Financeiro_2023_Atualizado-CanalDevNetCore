using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using ConceitusERP.Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConceitusERP.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsuarioSistemaFinanceiroController : ControllerBase
    {
        private readonly InterfaceUsuarioSistemaFinanceiro _interfaceUsuarioSistemaFinanceiro;
        private readonly IUsuarioSistemaFinanceiroServico _iUsuarioSistemaFinanceiroServico;

        public UsuarioSistemaFinanceiroController(InterfaceUsuarioSistemaFinanceiro interfaceUsuarioSistemaFinanceiro, IUsuarioSistemaFinanceiroServico iUsuarioSistemaFinanceiroServico)
        {
            _interfaceUsuarioSistemaFinanceiro = interfaceUsuarioSistemaFinanceiro;
            _iUsuarioSistemaFinanceiroServico = iUsuarioSistemaFinanceiroServico;
        }

        [HttpGet("/api/ListarUsuariosSistema")]
        [Produces("application/json")]
        public async Task<object> ListarUsuariosSistema(int sistemaId)
        {
            return await _interfaceUsuarioSistemaFinanceiro.ListarUsuariosSistema(sistemaId);
        }

        [HttpPost("/api/CadastrarUsuarioNoSistema")]
        [Produces("application/json")]
        public async Task<object> CadastrarUsuarioNoSistema(int sistemaId, string emailUsuario)
        {
            try
            {
                await _iUsuarioSistemaFinanceiroServico.CadastrarUsuarioNoSistema(
                    new UsuarioSistemaFinanceiro
                    {
                        SistemaId = sistemaId,
                        EmailUsuario = emailUsuario,
                        Administrador = false,
                        SistemaAtual = true
                    });
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
        }

        [HttpDelete("/api/DeletarUsuarioSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> DeletarUsuarioSistemaFinanceiro(int id)
        {
            try
            {
                var usuarioSistemaFinanceiro = await _interfaceUsuarioSistemaFinanceiro.GetById(id);

                await _interfaceUsuarioSistemaFinanceiro.Delete(usuarioSistemaFinanceiro);
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
        }
    }
}