import { Button, Space, theme, Tooltip } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { Dispatch, SetStateAction } from 'react';
import type { Client } from '../clients.type';

type Props = {
    client: Client,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>
    setUpdateClientModal: Dispatch<SetStateAction<Client | null>>
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
    setDeleteClientModal: Dispatch<SetStateAction<Client | null>>
}

export function ClientsActions({
    client,
    setIsUpdateModalOpen,
    setUpdateClientModal,
    setIsDeleteModalOpen,
    setDeleteClientModal,
}: Props) {
    const { token } = theme.useToken();

    return (
        <Space size='middle'>
            <Tooltip title="Editar">
                <Button
                    shape='circle'
                    type='text'
                    onClick={() => {
                        setIsUpdateModalOpen(true);
                        setUpdateClientModal(client);
                    }}
                >
                    <EditFilled
                        style={{ color: token.colorPrimary }}
                    />
                </Button>
            </Tooltip>

            <Tooltip title="Deletar">
                <Button 
                    shape='circle'
                    type='text'
                    onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteClientModal(client);
                    }}
                >
                    <DeleteFilled style={{ color: token.colorError }} />
                </Button>
            </Tooltip>
        </Space>
    );
}