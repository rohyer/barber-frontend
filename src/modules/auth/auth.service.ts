import type { LoginUser, RegisterUser } from './auth.contract';

export const registerUser = async(body: RegisterUser['body']) => {
    const url = 'http://localhost:80/api/users/register';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, message: ${error}`);
        }
    
        const data = await response.json();
        console.log('Usuário criado com sucesso: ', data);
        return data;
    } catch(error) {
        console.error('error: ', error);

        throw error;
    }
};

export const loginUser = async(body: LoginUser['body']) => {
    const url = 'http://localhost:80/api/users/login';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, message: ${error}`);
        }

        const data = await response.json();

        console.log('Login feito com sucess: ', data);

        return data;
    } catch(error) {
        console.error('error: ', error);

        throw error;
    }
};