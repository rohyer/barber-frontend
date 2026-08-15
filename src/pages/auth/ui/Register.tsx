import { Button, Card, Col, Flex, Form, Input, Row, Select, Space, message } from 'antd';
import { Typography } from 'antd';
// import type { FormProps } from 'antd';
import { authRegisterUser } from '../../../features/auth-register/api/authRegisterUser';
import { useNavigate } from 'react-router-dom';
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