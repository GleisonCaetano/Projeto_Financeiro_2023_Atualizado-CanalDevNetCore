using ConceitusERP.Domain.Entities;

namespace ConceitusERP.Domain.Interfaces.InterfaceServicos
{
    public interface IUsuarioSistemaFinanceiroServico
    {
        Task CadastrarUsuarioNoSistema(UsuarioSistemaFinanceiro usuarioSistemaFinanceiro);
    }
}