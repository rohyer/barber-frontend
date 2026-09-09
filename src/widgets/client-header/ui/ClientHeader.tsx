import { Button, Flex, Typography } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { ClientTableSelect } from '../../../features/client-table-filter/ui/ClientTableSelect';
import type { ClientModel } from '../../../entities/client/model/client.type';

type Props = {
    onSelectClient: (client?: ClientModel) => void,
    onCreateModalOpen: () => void,
};

export function ClientHeader({ onSelectClient, onCreateModalOpen }: Props) {
    return (
        <Fragment>
            <Typography.Title level={2}>Clientes</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <ClientTableSelect onSelectClient={onSelectClient} />

                <Button
                    type='primary'
                    size='large'
                    onClick={onCreateModalOpen}
                >
                    Cadastrar
                </Button>
            </Flex>
        </Fragment>
    );
}