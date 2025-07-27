import { Col, Row } from 'antd';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

export function Container({ children }: Props) {
    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={18} xl={24}>
                {children}
            </Col>
        </Row>
    );
}