import { Space } from 'antd';
import { Fragment, useState } from 'react';

import type { ClientModel } from '@/entities/client';
import { DeleteClientModal } from '@/features/client-delete';
import { ClientFormModal } from '@/widgets/client-form-modal';
import { ClientHeader } from '@/widgets/client-header';
import { ClientsTable } from '@/widgets/client-table';

import { Show } from '../../../shared/ui/Show';

export function ClientsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateClientModal, setUpdateClientModal] = useState<ClientModel | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteClientModal, setDeleteClientModal] = useState<ClientModel | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Fragment>
            <Space direction='vertical' style={{ width: '100%' }}>
                <ClientHeader
                    onSelectClient={(client?: ClientModel) => {
                        setCurrentPage(1);
                        setSearchQuery(client?.name ?? '');
                    }}
                    onCreateModalOpen={() => setIsCreateModalOpen(true)}
                />

                <ClientsTable
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    setUpdateClientModal={setUpdateClientModal}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setDeleteClientModal={setDeleteClientModal}
                />
            </Space>

            <Show when={isCreateModalOpen}>
                <ClientFormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false) }
                />
            </Show>

            <Show when={isUpdateModalOpen && updateClientModal !== null}>
                <ClientFormModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setUpdateClientModal(null);
                    }}
                    clientToEdit={updateClientModal!}
                />
            </Show>

            <Show when={isDeleteModalOpen && deleteClientModal !== null}>
                <DeleteClientModal
                    isOpen={isDeleteModalOpen}
                    deleteClientModal={deleteClientModal!}
                    setDeleteClientModal={setDeleteClientModal}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            </Show>
        </Fragment>
    );
}

