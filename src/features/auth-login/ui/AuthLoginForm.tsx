import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { FormValues } from '../model/authLogin.type';
import { useAuthLogin } from '../model/useAuthLogin';

export function AuthLoginForm() {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const { login } = useAuthLogin();

    const onFinish = async (values: FormValues) => {
        const response = await login(values);

        if (!response)
            return;

        navigate('/');

        form.resetFields();
    };

    return (
        <Form
            form={form}
            size='large'
            onFinish={onFinish}
        >
            <Typography.Title level={2}>Bem-vindo a Barber Prime</Typography.Title>

            <Typography.Paragraph>Ainda não possui uma conta? <Link to='/cadastro'>Crie aqui</Link></Typography.Paragraph>

            <Form.Item
                name='email'
                rules={[{ required: true, message: 'Por favor, insira um e-mail' }]}
            >
                <Input placeholder='E-mail' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Por favor, insira uma senha' }]}
            >
                <Input placeholder='Senha' />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' size='large' block>
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    );
}