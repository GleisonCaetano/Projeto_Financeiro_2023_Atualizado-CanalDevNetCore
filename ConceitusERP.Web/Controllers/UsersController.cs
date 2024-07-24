using ConceitusERP.Web.Models;
using ConceitusERP.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace ConceitusERP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpPost("/api/AdicionarUsuario")]
        public async Task<IActionResult> AdicionarUsuario([FromBody] Login login)
        {
            if (string.IsNullOrWhiteSpace(login.Email) || 
                string.IsNullOrWhiteSpace(login.Senha) || 
                string.IsNullOrWhiteSpace(login.Cpf))
                    return Ok("Falta alguns dados");
            
            var user = new ApplicationUser
            {
                Email = login.Email,
                UserName = login.Email,
                Cpf = login.Cpf
            };

            var result = await _userManager.CreateAsync(user, login.Senha);

            if (result.Errors.Any())
                return Ok(result.Errors);


            //Geração de confirmação por email, caso necessário
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            //Retorno do email
            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var responseReturn = await _userManager.ConfirmEmailAsync(user, code);

            if (responseReturn.Succeeded)
            {
                return Ok("Usuário Adicionado!");
            }
            else
            {
                return Ok("Erro ao Confirmar Cadastro de Usuário!");
            }
        }
    }
}
