import { Button, Flex, Typography } from 'antd';
import { Fragment } from 'react/jsx-runtime';

import type { EmployeeModel } from '@/entities/employee';
import { EmployeeTableSelect } from '@/features/employee-table-filter';

type Props = {
    onSelectEmployee: (client?: EmployeeModel) => void,
    onCreateModalOpen: () => void,
};

export function EmployeeHeader({ onSelectEmployee, onCreateModalOpen }: Props) {
    return (
        <Fragment>
            <Typography.Title level={2}>Clientes</Typography.Title>

            <Flex justify='space-between' gap='small'>
                <EmployeeTableSelect onSelectEmployee={onSelectEmployee} />

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