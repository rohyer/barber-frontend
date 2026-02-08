import { Tag, Tooltip } from 'antd';
import type { ClientModel } from '../../clients.type';
import { getClientStatusValues } from '../../clients.helper';

type Props = {
    lastCustomerServiceDate: ClientModel['lastCustomerServiceDate'],
    createdAt: ClientModel['createdAt'],
}

export function ClientsStatus({ lastCustomerServiceDate, createdAt }: Props) {
    const {
        title,
        color,
        status
    } = getClientStatusValues(lastCustomerServiceDate, createdAt);

    return (
        <Tooltip title={title}>
            <Tag color={color}>{status}</Tag>
        </Tooltip>
    );
}