namespace Domain.Interfaces.Generics
{
    public interface InterfaceGenerica<T> where T : class
    {
        Task Add(T Objeto);
        Task Update(T Objeto);
        Task Delete(T Objeto);
        Task<T> GetById(T Objeto);
        Task<List<T>> List();
    }
}