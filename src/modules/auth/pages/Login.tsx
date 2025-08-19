import { Button, Card, Flex, Form, Input, } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import style from './Login.module.css';

const { Title, Paragraph } = Typography;

type Values = {
    email: string,
    password: string,
}

export function Login () {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const { login } = useAuth();

    const onFinish = async (values: Values) => {
        const response = await login(values);

        if (!response)
            return;

        navigate('/');

        form.resetFields();
    };

    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Acesse sua conta" className={style.card}>
                <Form
                    form={form}
                    size='large'
                    onFinish={onFinish}
                >
                    <Title level={2}>Bem-vindo a Barber Prime</Title>

                    <Paragraph>Ainda não possui uma conta? <Link to='/cadastro'>Crie aqui</Link></Paragraph>

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
            </Card>
        </Flex>
    );
}