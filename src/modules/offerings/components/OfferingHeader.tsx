import { Button, Flex, Typography } from 'antd';
import { type Dispatch, type SetStateAction } from 'react';

type Props = {
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>
};

export function OfferingHeader({
    setIsCreateModalOpen,
}: Props ) {
    return (
        <Flex justify='space-between'>
            <Typography.Title level={2}>Serviços</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <Button
                    type='primary'
                    size='large'
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Cadastrar
                </Button>
            </Flex>
        </Flex>
    );
}