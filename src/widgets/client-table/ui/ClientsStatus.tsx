import { Tag, Tooltip, type TagProps } from 'antd';
import type { ClientModel } from '../../../entities/client/model/client.type';
import { getClientStatusValues } from '../../../entities/client/lib/getClientStatusValues';
import type { ClientStatus } from '../../../entities/client/model/client.type';

type Props = {
    lastCustomerServiceDate: ClientModel['lastCustomerServiceDate'],
    createdAt: ClientModel['createdAt'],
}

type StatusPresentation = {
    status: 'Novo' | 'Ativo' | 'Ausente',
    title: string,
    color: TagProps['color'],
};

const clientStatusPresentation: Record<ClientStatus, StatusPresentation> = {
    new: {
        status: 'Novo',
        title: 'Cliente cadastrado ainda sem atendimento',
        color: 'blue',
    },
    active: {
        status: 'Ativo',
        title: 'Último atendimento feito em menos de 30 dias',
        color: 'blue-inverse',
    },
    ausent: {
        status: 'Ausente',
        title: 'Mais de 30 dias sem atendimento',
        color: 'red-inverse',
    },
};

export function ClientsStatus({ lastCustomerServiceDate, createdAt }: Props) {
    const status = getClientStatusValues(lastCustomerServiceDate, createdAt);

    const { title, color } = clientStatusPresentation[status];

    return (
        <Tooltip title={title}>
            <Tag color={color}>{status}</Tag>
        </Tooltip>
    );
}