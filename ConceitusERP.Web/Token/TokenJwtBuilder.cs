using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ConceitusERP.Web.Token
{
    public class TokenJwtBuilder
    {
        private SecurityKey securityKey = null;
        private string subject = "";
        private string issuer = "";
        private string audience = "";
        private Dictionary<string, string> claims = new Dictionary<string, string>();
        private int expireInMinutes = 5;

        public TokenJwtBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this.securityKey = securityKey;
            return this;
        }

        public TokenJwtBuilder AddSubject(string subject)
        {
            this.subject = subject;
            return this;
        }

        public TokenJwtBuilder AddIssuer(string issuer)
        {
            this.issuer = issuer;
            return this;
        }

        public TokenJwtBuilder AddAudience(string audience)
        {
            this.audience = audience;
            return this;
        }

        public TokenJwtBuilder AddClaim(string type, string value)
        {
            this.claims.Add(type, value);
            return this;
        }

        public TokenJwtBuilder AddClaims(Dictionary<string, string> claims)
        {
            this.claims.Union(claims);
            return this;
        }

        public TokenJwtBuilder AddExpire(int expireInMinutes)
        {
            this.expireInMinutes = expireInMinutes;
            return this;
        }

        private void EnsureArguments()
        {
            if (this.securityKey == null)
                throw new ArgumentNullException("Security Key");

            if (string.IsNullOrEmpty(this.subject))
                throw new ArgumentNullException("Subject");

            if (string.IsNullOrEmpty(this.issuer))
                throw new ArgumentNullException("Issuer");
            
            if (string.IsNullOrEmpty(this.audience))
                throw new ArgumentNullException("Audience");
        }

        public TokenJwt Builder()
        {
            EnsureArguments();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, this.subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Union(this.claims.Select(item => new Claim(item.Key, item.Value)));

            var token = new JwtSecurityToken(
                issuer: this.issuer,
                audience: this.audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expireInMinutes),
                signingCredentials: new SigningCredentials(
                    this.securityKey,
                    SecurityAlgorithms.HmacSha256)
            );

            return new TokenJwt(token);
        }
    }
}