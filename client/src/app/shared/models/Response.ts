export interface Response<T> {
    data: T,
    success: boolean,
    errors: string[]
}