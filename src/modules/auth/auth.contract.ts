type Body = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    state: string,
    city: string,
    phone: string,
}

// type Data = {};

export type RegisterUser = {
    body: Body,
    // response: Response,
}

type Body2 = {
    email: string,
    password: string,
}

export type LoginUser = {
    body: Body2
}