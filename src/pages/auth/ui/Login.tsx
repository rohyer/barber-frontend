import { Card, Flex } from 'antd';
import style from './Login.module.css';
import { AuthLoginForm } from '../../../features/auth-login/ui/AuthLoginForm';

export function Login () {
    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Acesse sua conta" className={style.card}>
                <AuthLoginForm />
            </Card>
        </Flex>
    );
}