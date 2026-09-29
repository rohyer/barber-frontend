import { Button, Flex, Typography } from 'antd';

type Props = {
    onCreateModalOpen: () => void,
};

export function OfferingHeader({ onCreateModalOpen }: Props ) {
    return (
        <Flex justify='space-between'>
            <Typography.Title level={2}>Serviços</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <Button
                    type='primary'
                    size='large'
                    onClick={onCreateModalOpen}
                >
                    Cadastrar
                </Button>
            </Flex>
        </Flex>
    );
}