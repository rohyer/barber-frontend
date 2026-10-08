export type ApiResponse<T> = {
    success: boolean,
    message: string,
    fromCache?: boolean,
    data: T
}