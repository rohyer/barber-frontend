import { Space } from 'antd';
import { Fragment, useState } from 'react';
import type { Client } from '../clients.type';
import { CreateClientModal } from '../components/Modals/CreateClientModal';
import { DeleteClientModal } from '../components/Modals/DeleteClientModal';
import { UpdateClientModal } from '../components/Modals/UpdateClientModal';
import { Show } from '../../../shared/components/Show';
import { ClientsHeader } from '../components/ClientsHeader';
import { ClientsTable } from '../components/ClientsTable';

export function ClientsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchingQuery, setSearchingQuery] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [updateClientModal, setUpdateClientModal] = useState<Client | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    const [deleteClientModal, setDeleteClientModal] = useState<Client | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Fragment>
            <Space direction='vertical' style={{ width: '100%' }}>
                <ClientsHeader
                    searchingQuery={searchingQuery}
                    setSearchingQuery={setSearchingQuery}
                    setSearchQuery={setSearchQuery}
                    setCurrentPage={setCurrentPage}
                    setIsCreateModalOpen={setIsCreateModalOpen}
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
                <CreateClientModal
                    isOpen={isCreateModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Show>

            <Show when={isUpdateModalOpen && updateClientModal !== null}>
                <UpdateClientModal
                    isOpen={isUpdateModalOpen}
                    updateClientModal={updateClientModal!}
                    setUpdateClientModal={setUpdateClientModal}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
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

