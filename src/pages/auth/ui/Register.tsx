import { Card, Flex } from 'antd';
import style from './Register.module.css';
import { AuthRegisterForm } from '../../../features/auth-register/ui/AuthRegisterForm';

export function Register () {
    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Cadastre-se" className={style.card}>
                <AuthRegisterForm />
            </Card>
        </Flex>
    );
}