import { Button, Col, Form, Input, Row, Select, Space, message } from 'antd';
import { Typography } from 'antd';
// import type { FormProps } from 'antd';
import { registerUser } from '../auth.service';
import { STATES } from '../auth.constant';
import { Link, useNavigate } from 'react-router-dom';

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
        <Row align='middle' justify='center'>
            <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            </Col>

            <Col
                xs={24} sm={24} md={12} lg={12} xl={12}
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    size='large'
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <Title level={1}>Cadastre-se</Title>

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
            </Col>
        </Row>
    );
}