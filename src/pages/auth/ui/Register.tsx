import { Card, Flex } from 'antd';

import { AuthRegisterForm } from '../../../features/auth-register/ui/AuthRegisterForm';
import style from './Register.module.css';

export function Register () {
    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Cadastre-se" className={style.card}>
                <AuthRegisterForm />
            </Card>
        </Flex>
    );
}