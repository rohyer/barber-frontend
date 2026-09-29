import { Space } from 'antd';
import { Fragment, useState } from 'react';

import type { EmployeeModel } from '../../../entities/employee/model/employee.type';
import { DeleteEmployeeModal } from '../../../features/employee-delete/ui/DeleteEmployeeModal';
import { Show } from '../../../shared/ui/Show';
import { EmployeeFormModal } from '../../../widgets/employee-form-modal/ui/EmployeeFormModal';
import { EmployeeHeader } from '../../../widgets/employee-header/ui/EmployeeHeader';
import { EmployeesTable } from '../../../widgets/employee-table/ui/EmployeesTable';

export function EmployeesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateEmployeeModal, setUpdateEmployeeModal] = useState<EmployeeModel | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteEmployeeModal, setDeleteEmployeeModal] = useState<EmployeeModel | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Fragment>
            <Space direction='vertical' style={{ width: '100%' }}>
                <EmployeeHeader
                    onSelectEmployee={(employee?: EmployeeModel) => {
                        setCurrentPage(1);
                        setSearchQuery(employee?.name ?? '');
                    }}
                    onCreateModalOpen={() => setIsCreateModalOpen(true)}
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
                <EmployeeFormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false) }
                />
            </Show>
            
            <Show when={isUpdateModalOpen && updateEmployeeModal !== null}>
                <EmployeeFormModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setUpdateEmployeeModal?.(null);
                    }}
                    employeeToEdit={updateEmployeeModal!}
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

