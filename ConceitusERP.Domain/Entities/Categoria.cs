using ConceitusERP.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConceitusERP.Domain.Entities
{
    public class Categoria : Base
    {
        [ForeignKey("SistemaFinanceiro")]
        [Column(Order = 3)]
        public int SistemaId { get; set; }
        //public virtual SistemaFinanceiro SistemaFinanceiro { get; set; }
    }
}