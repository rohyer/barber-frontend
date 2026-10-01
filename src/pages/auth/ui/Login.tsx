import { Card, Flex } from 'antd';

import { AuthLoginForm } from '@/features/auth-login';

import style from './Login.module.css';

export function Login () {
    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Acesse sua conta" className={style.card}>
                <AuthLoginForm />
            </Card>
        </Flex>
    );
}