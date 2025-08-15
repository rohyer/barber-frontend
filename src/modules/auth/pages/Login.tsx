import { Button, Col, Form, Input, Row } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
        <Row align='middle' justify='center'>
            <Col xs={0} sm={0} md={12} lg={12} xl={12}></Col>

            <Col
                xs={24} sm={24} md={12} lg={12} xl={12}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Form
                    form={form}
                    size='large'
                    onFinish={onFinish}
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <Title level={1}>Acesse sua conta</Title>

                    <Paragraph>Ainda não possui uma conta? <Link to='/register'>Crie aqui</Link></Paragraph>

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
            </Col>
        </Row>
    );
}