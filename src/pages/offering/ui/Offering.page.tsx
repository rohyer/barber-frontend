import { useQuery } from '@tanstack/react-query';
import { offeringQueryOptions } from '../../../widgets/offering-cards/model/offeringCards.query';
import { Col, Row } from 'antd';
import { Fragment, useState } from 'react';
import { OfferingCard } from '../../../entities/offering/ui/OfferingCard';
import { OfferingHeader } from '../../../widgets/offering-header/ui/OfferingHeader';
import { Show } from '../../../shared/ui/Show';
import type { OfferingModel } from '../../../entities/offering/model/offering.type';
import { DeleteOfferingModal } from '../../../features/offering-delete/ui/DeleteOfferingModal';
import { OfferingFormModal } from '../../../widgets/offering-form-modal/ui/OfferingFormModal';

export function OfferingPage() {
    const { data, isPending } = useQuery(offeringQueryOptions());

    const [isCreteModalOpen, setIsCreateModalOpen] = useState(false);

    const [deleteOfferingSelected, setDeleteOfferingSelected] = useState<OfferingModel | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [updateOfferingSelected, setUpdateOfferingSelected] = useState<OfferingModel | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const cards = data?.data?.offerings.map(offering => (
        <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <OfferingCard
                offering={offering}
                isPending={isPending}
                onDelete={(offering: OfferingModel) => {
                    setDeleteOfferingSelected(offering);
                    setIsDeleteModalOpen(true);
                }}
                onUpdate={(offering: OfferingModel) => {
                    setUpdateOfferingSelected(offering);
                    setIsUpdateModalOpen(true);
                }}
            />
        </Col>
    ));

    return (
        <Fragment>
            <OfferingHeader onCreateModalOpen={() => setIsCreateModalOpen(true)} />
            
            <Row gutter={[16, 16]}>
                {cards}
            </Row>

            <Show when={isCreteModalOpen}>
                <OfferingFormModal
                    isOpen={isCreteModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            </Show>

            <Show when={isUpdateModalOpen && updateOfferingSelected !== null}>
                <OfferingFormModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setUpdateOfferingSelected(null);
                    }}
                    offeringToEdit={updateOfferingSelected!}
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