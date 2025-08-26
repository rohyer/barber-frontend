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
            if (response.status >= 500) 
                throw new Error(`Erro do servidor: ${response.status}`);

            if (response.status >= 400)
                throw new Error(`Erro do cliente: ${response.status}`);
        }
    
        const data = await response.json();

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
            if (response.status >= 500) 
                throw new Error(`Erro do servidor: ${response.status}`);

            if (response.status >= 400)
                throw new Error(`Erro do cliente: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch(error) {
        console.error('error: ', error);

        throw error;
    }
};