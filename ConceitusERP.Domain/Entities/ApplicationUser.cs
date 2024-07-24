using Microsoft.AspNetCore.Identity;

namespace ConceitusERP.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Cpf { get; set; }
    }
}