import { Button, Space, theme, Tooltip } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { Dispatch, SetStateAction } from 'react';
import type { EmployeeModel } from '../../employees.type';

type Props = {
    employee: EmployeeModel,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>
    setUpdateEmployeeModal: Dispatch<SetStateAction<EmployeeModel | null>>
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
    setDeleteEmployeeModal: Dispatch<SetStateAction<EmployeeModel | null>>
}

export function EmployeesActions({
    employee,
    setIsUpdateModalOpen,
    setUpdateEmployeeModal,
    setIsDeleteModalOpen,
    setDeleteEmployeeModal,
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
                        setUpdateEmployeeModal(employee);
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
                    danger
                    onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteEmployeeModal(employee);
                    }}
                >
                    <DeleteFilled />
                </Button>
            </Tooltip>
        </Space>
    );
}