type Ok<T> = {
    success: true,
    data: T,
    error: null,
}

type Error = {
    message: string,
    status?: number,
}

type Fail = {
    success: false,
    data: null,
    error: Error,
}

export type Result<T> = Ok<T> | Fail

export const ok = <T>(data: T): Ok<T> => {
    return { success: true, data, error: null };
};

export const fail = (error: Fail['error']): Fail => {
    return { success: false, data: null, error };
};