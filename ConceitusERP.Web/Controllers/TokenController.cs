using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using ConceitusERP.Web.Token;
using ConceitusERP.Web.Models;

namespace ConceitusERP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public TokenController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpPost("/api/CreateToken")]
        public async Task<IActionResult> CreateToken([FromBody] InputModel input)
        {
            if (string.IsNullOrWhiteSpace(input.Email) || string.IsNullOrWhiteSpace(input.Password))
                return Unauthorized();

            var result = await _signInManager.PasswordSignInAsync(input.Email, input.Password, false, lockoutOnFailure:false);

            if (result.Succeeded)
            {
                var token = new TokenJwtBuilder()
                    .AddSecurityKey(JwtSecurityKey.Create("ConceitusERPCarlosGleison1978Cgco_#09a"))
                    .AddSubject("Conceitus ERP")
                    .AddIssuer("Teste.Security.Bearer")
                    .AddAudience("Teste.Security.Bearer")
                    .AddClaim("UsuarioApiNumero", "1")
                    .AddExpire(5)
                    .Builder();

                    return Ok(token.value);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
