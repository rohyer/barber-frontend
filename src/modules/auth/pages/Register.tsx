import { Button, Card, Col, Flex, Form, Input, Row, Select, Space, message } from 'antd';
import { Typography } from 'antd';
// import type { FormProps } from 'antd';
import { registerUser } from '../auth.service';
import { STATES } from '../auth.constant';
import { Link, useNavigate } from 'react-router-dom';
import style from './Register.module.css';

type Values = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    state: string,
    city: string,
    phone: string,
}

const { Title, Paragraph } = Typography;

export function Register () {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: Values) => {
        const response = registerUser(values);

        message.success({
            content: 'Cadastro realizado. Login será feito em instantes!',
            duration: 5,
            onClose: () => {
                navigate('/login');
            }
        });

        form.resetFields();
    };

    return (
        <Flex justify='center' align='center' className={style.page}>
            <Card title="Cadastre-se" className={style.card}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    size='large'
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <Title level={2}>Crie sua conta conosco</Title>

                    <Paragraph>Já possui uma conta? <Link to='/login'>Entre aqui</Link></Paragraph>

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira um nome' }]}
                    >
                        <Input placeholder='Nome' />
                    </Form.Item>
                    
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Por favor, insira um e-mail' }]}
                    >
                        <Input placeholder='E-mail' />
                    </Form.Item>

                    <Space size={'large'}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor, insira uma senha' }]}
                        >
                            <Input.Password placeholder='Senha' />
                        </Form.Item>

                        <Form.Item
                            name="password2"
                            rules={[{ required: true, message: 'Por favor, repita a senha' }]}
                        >
                            <Input.Password placeholder='Repita sua senha' />
                        </Form.Item>
                    </Space>

                    <Form.Item
                        name="state"
                        rules={[{ required: true, message: 'Por favor, insira o estado' }]}
                    >
                        <Select
                            placeholder='Estado'
                            showSearch
                            options={STATES}
                        />
                    </Form.Item>

                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
                    >
                        <Input placeholder='Cidade' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
                    >
                        <Input placeholder='Telefone' />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type='primary' htmlType='submit' size='large' block>
                                    Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
}