import { useQuery } from '@tanstack/react-query';
import { offeringQueryOptions } from '../offerings.queries';
import { Col, Row } from 'antd';
import { Fragment, useState } from 'react';
import { OfferingCard } from '../components/OfferingCard';
import { OfferingHeader } from '../components/OfferingHeader';
import { Show } from '../../../shared/components/Show';
import { CreateOfferingModal } from '../components/modals/CreateOfferingModal';

export function OfferingsPage() {
    const { data, isPending } = useQuery(offeringQueryOptions());

    const [isCreteModalOpen, setIsCreateModalOpen] = useState(false);

    const cards = data?.data.offerings.map(offering => (
        <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <OfferingCard
                offering={offering}
                isPending={isPending}
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
        </Fragment>
    );
}