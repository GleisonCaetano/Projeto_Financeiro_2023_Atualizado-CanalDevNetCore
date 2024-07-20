using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class UsuarioSistemaFinanceiro
    {
        [Column(Order = 1)]
        public int Id { get; set; }
        [Column(Order = 2)]
        public string Email { get; set; }
        [Column(Order = 3)]
        public bool Administrador { get; set; }
        [Column(Order = 4)]
        public bool SistemaAtual { get; set; }

        [ForeignKey("SistemaFinanceiro")]
        [Column(Order = 5)]
        public int SistemaId { get; set; }
        public virtual SistemaFinanceiro SistemaFinanceiro { get; set; }
    }
}