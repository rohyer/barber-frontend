import { type Dispatch, type SetStateAction } from 'react';
import { Empty, Table, type TablePaginationConfig, type TableProps } from 'antd';
import type { EmployeeModel } from '../../employees.type';
import { employeesQueryOptions } from '../../employees.queries';
import { useQuery } from '@tanstack/react-query';
import { calculateAge } from '../../../clients/clients.helper';
import { EmployeesActions } from './EmployeesActions.';
import { applyMask, getRightMask } from '../../../../shared/utils/mask';

type Props = {
    searchQuery: string,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>,
    setUpdateEmployeeModal: Dispatch<SetStateAction<EmployeeModel | null>>,
    setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
    setDeleteEmployeeModal: Dispatch<SetStateAction<EmployeeModel | null>>,
};

export function EmployeesTable({
    searchQuery,
    currentPage,
    setCurrentPage,
    setIsUpdateModalOpen,
    setUpdateEmployeeModal,
    setIsDeleteModalOpen,
    setDeleteEmployeeModal,
}: Props) {
    const { data, isPending } = useQuery(employeesQueryOptions(
        { page: currentPage, search: searchQuery }
    ));

    const handleChange = (pagination: TablePaginationConfig) => {        
        if (pagination.current === undefined)
            return;

        setCurrentPage(pagination.current);
    };

    const dataSource = data?.data.employees && data?.data.employees.map(employee => ({
        key: employee.id,
        appointments: employee.totalAppointments,
        name: employee.name,
        sex: employee.sex,
        age: calculateAge(employee.birth),
        phone: applyMask(employee.phone, getRightMask(employee.phone)),
        actions: (
            <EmployeesActions
                employee={employee}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                setUpdateEmployeeModal={setUpdateEmployeeModal}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                setDeleteEmployeeModal={setDeleteEmployeeModal}
            />
        ),
    }));

    const columns: TableProps['columns'] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            minWidth: 250,
        },
        {
            title: 'Atendimentos',
            dataIndex: 'appointments',
            minWidth: 125,
        },
        {
            title: 'Sexo',
            dataIndex: 'sex',
            width: 125,
        },
        {
            title: 'Idade',
            dataIndex: 'age',
            width: 125,
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            width: 150,
            minWidth: 150,
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            width: 125
        },
    ];

    return (
        <Table
            tableLayout='auto'
            size='middle'
            columns={columns}
            dataSource={dataSource}
            loading={isPending}
            locale={{ emptyText: <Empty description="Nenhum colaborador encontrado" /> }}
            sortDirections={['ascend']}
            onChange={(pagination) => {
                handleChange(pagination);
                setCurrentPage(pagination.current ?? 1);
            }}
            scroll={{ x: '500' }}
            pagination={{
                total: data?.data.total,
                current: currentPage,
                showTotal(total) {
                    return `Total de colaboradores: ${total}`;
                },
            }}
        />
    );
}