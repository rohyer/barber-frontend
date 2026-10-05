import { Space } from 'antd';
import { Fragment, useState } from 'react';

import type { EmployeeModel } from '@/entities/employee';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import { EmployeeFormModal } from '@/widgets/employee-form-modal';
import { EmployeeHeader } from '@/widgets/employee-header';
import { EmployeesTable } from '@/widgets/employee-table';

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

            {isCreateModalOpen &&
                <EmployeeFormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false) }
                />
            }
            
            {isUpdateModalOpen && updateEmployeeModal !== null &&
                <EmployeeFormModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setUpdateEmployeeModal?.(null);
                    }}
                    employeeToEdit={updateEmployeeModal}
                />
            }

            {isDeleteModalOpen && deleteEmployeeModal !== null &&
                <DeleteEmployeeModal
                    isOpen={isDeleteModalOpen}
                    deleteEmployeeModal={deleteEmployeeModal}
                    setDeleteEmployeeModal={setDeleteEmployeeModal}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            }
        </Fragment>
    );
}

