using ConceitusERP.Domain.Entities;
using ConceitusERP.Domain.Interfaces.ICategoria;
using ConceitusERP.Domain.Interfaces.InterfaceServicos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConceitusERP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class CategoriaController : ControllerBase
    {
        private readonly InterfaceCategoria _interfaceCategoria;
        private readonly ICategoriaServico _iCategoriaServico;

        public CategoriaController(InterfaceCategoria interfaceCategoria, ICategoriaServico iCategoriaServico)
        {
            _interfaceCategoria = interfaceCategoria;
            _iCategoriaServico = iCategoriaServico;
        }

        [HttpGet("/api/ListarCategoriasUsuario")]
        [Produces("application/json")]
        public async Task<object> ListarCategoriasUsuario(string emailUsuario)
        {
            return await _interfaceCategoria.ListarCategoriasUsuario(emailUsuario);
        }

        [HttpPost("/api/AdicionarCategoria")]
        [Produces("application/json")]
        public async Task<object> AdicionarCategoria(Categoria categoria)
        {
            await _iCategoriaServico.AdicionarCategoria(categoria);

            return categoria;
        }

        [HttpPut("/api/AtualizarCategoria")]
        [Produces("application/json")]
        public async Task<object> AtualizarCategoria(Categoria categoria)
        {
            await _iCategoriaServico.AtualizarCategoria(categoria);

            return categoria;
        }

        [HttpGet("/api/ObterCategoria")]
        [Produces("application/json")]
        public async Task<object> ObterCategoria(int id)
        {
            return await _interfaceCategoria.GetById(id);
        }

        [HttpDelete("/api/DeletarCategoria")]
        [Produces("application/json")]
        public async Task<object> DeletarCategoria(int id)
        {
            try
            {
                var categoria = await _interfaceCategoria.GetById(id);

                await _interfaceCategoria.Delete(categoria);
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}
