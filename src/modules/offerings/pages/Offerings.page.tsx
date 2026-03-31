import { useQuery } from '@tanstack/react-query';
import { offeringQueryOptions } from '../offerings.queries';
import { Col, Row } from 'antd';
import { Fragment, useState } from 'react';
import { OfferingCard } from '../components/OfferingCard';
import { OfferingHeader } from '../components/OfferingHeader';
import { Show } from '../../../shared/components/Show';
import { CreateOfferingModal } from '../components/modals/CreateOfferingModal';
import type { OfferingModel } from '../offerings.type';
import { DeleteOfferingModal } from '../components/modals/DeleteOfferingModal';

export function OfferingsPage() {
    const { data, isPending } = useQuery(offeringQueryOptions());

    const [isCreteModalOpen, setIsCreateModalOpen] = useState(false);

    const [deleteOfferingSelected, setDeleteOfferingSelected] = useState<OfferingModel | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [editOfferingSelected, setEditOfferingSelected] = useState<OfferingModel | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const cards = data?.data.offerings.map(offering => (
        <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <OfferingCard
                offering={offering}
                isPending={isPending}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                setDeleteOfferingSelected={setDeleteOfferingSelected}
                setIsEditModalOpen={setIsEditModalOpen}
                setEditOfferingSelected={setEditOfferingSelected}
            />
        </Col>
    ));

    return (
        <Fragment>
            <OfferingHeader setIsCreateModalOpen={setIsCreateModalOpen} />
            
            <Row gutter={[16, 16]}>
                {cards}
            </Row>

            <Show when={isCreteModalOpen}>
                <CreateOfferingModal
                    isOpen={isCreteModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Show>

            <Show when={isDeleteModalOpen && deleteOfferingSelected !== null}>
                <DeleteOfferingModal
                    isOpen={isDeleteModalOpen}
                    deleteOfferingSelected={deleteOfferingSelected!}
                    setDeleteOfferingSelected={setDeleteOfferingSelected}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            </Show>
        </Fragment>
    );
}