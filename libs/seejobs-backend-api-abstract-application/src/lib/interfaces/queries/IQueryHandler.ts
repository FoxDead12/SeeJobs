export interface IQueryHandler<T, R> {
    Handle(query: T): R;
}
