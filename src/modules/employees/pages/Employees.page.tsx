import { Space } from 'antd';
import { Fragment, useState } from 'react';
import type { EmployeeModel } from '../employees.type';
import { CreateEmployeeModal } from '../components/Modals/CreateEmployeeModal';
import { DeleteEmployeeModal } from '../components/Modals/DeleteEmployeeModal';
import { UpdateEmployeeModal } from '../components/Modals/UpdateEmployeeModal';
import { Show } from '../../../shared/components/Show';
import { EmployeesHeader } from '../components/Table/EmployeesHeader';
import { EmployeesTable } from '../components/Table/EmployeesTable';

export function EmployeesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchingQuery, setSearchingQuery] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateEmployeeModal, setUpdateEmployeeModal] = useState<EmployeeModel | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteEmployeeModal, setDeleteEmployeeModal] = useState<EmployeeModel | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Fragment>
            <Space direction='vertical' style={{ width: '100%' }}>
                <EmployeesHeader
                    searchingQuery={searchingQuery}
                    setSearchingQuery={setSearchingQuery}
                    setSearchQuery={setSearchQuery}
                    setCurrentPage={setCurrentPage}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />

                <EmployeesTable
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    setUpdateEmployeeModal={setUpdateEmployeeModal}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setDeleteEmployeeModal={setDeleteEmployeeModal}
                />
            </Space>

            <Show when={isCreateModalOpen}>
                <CreateEmployeeModal
                    isOpen={isCreateModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Show>

            <Show when={isUpdateModalOpen && updateEmployeeModal !== null}>
                <UpdateEmployeeModal
                    isOpen={isUpdateModalOpen}
                    updateEmployeeModal={updateEmployeeModal!}
                    setUpdateEmployeeModal={setUpdateEmployeeModal}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                />
            </Show>

            <Show when={isDeleteModalOpen && deleteEmployeeModal !== null}>
                <DeleteEmployeeModal
                    isOpen={isDeleteModalOpen}
                    deleteEmployeeModal={deleteEmployeeModal!}
                    setDeleteEmployeeModal={setDeleteEmployeeModal}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            </Show>
        </Fragment>
    );
}

