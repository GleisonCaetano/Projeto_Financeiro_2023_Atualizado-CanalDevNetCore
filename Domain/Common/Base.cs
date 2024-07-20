namespace Domain.Common
{
    public class Base : Notify
    {
        [Column(Order = 1)]
        public int Id { get; set; }
        [Column(Order = 2)]
        public string Nome { get; set; }
        public bool Exluido { get; set; }
    }
}