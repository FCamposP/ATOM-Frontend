export interface IResponseWrapper<T> {
    data: T;
    status: number;
    message:string;
}
