using ConceitusERP.Domain.Common;
using ConceitusERP.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConceitusERP.Domain.Entities
{
    public class Despesa : Base
    {
        [Column(Order = 3)]
        public decimal Valor { get; set; }
        [Column(Order = 4)]
        public int Mes { get; set; }
        [Column(Order = 5)]
        public int Ano { get; set; }
        [Column(Order = 6)]
        public TipoDespesaEnum TipoDespesa { get; set; }
        [Column(Order = 7)]
        public DateTime DataCadastro { get; set; }
        [Column(Order = 8)]
        public DateTime DataAlteracao { get; set; }
        [Column(Order = 9)]
        public DateTime DataPagamento { get; set; }
        [Column(Order = 10)]
        public DateTime DataVencimento { get; set; }
        [Column(Order = 11)]
        public bool Pago { get; set; }
        [Column(Order = 12)]
        public bool DespesaAtrasada { get; set; }

        [ForeignKey("Categoria")]
        [Column(Order = 13)]
        public int CategoriaId { get; set; }
        //public virtual Categoria Categoria { get; set; }
    }
}