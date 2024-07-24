using ConceitusERP.Domain.Notifications;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConceitusERP.Domain.Common
{
    public class Base : Notify
    {
        [Column(Order = 1)]
        public int Id { get; set; }
        [Column(Order = 2)]
        public string Nome { get; set; }
        public bool Excluido { get; set; }
    }
}