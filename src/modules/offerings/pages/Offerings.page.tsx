import { useQuery } from '@tanstack/react-query';
import { offeringQueryOptions } from '../offerings.queries';
import { Flex, Space } from 'antd';
import { Fragment, useState } from 'react';
import { OfferingCard } from '../components/OfferingCard';
import { OfferingHeader } from '../components/OfferingHeader';
import { Show } from '../../../shared/components/Show';
import { CreateOfferingModal } from '../components/modals/CreateOfferingModal';

export function OfferingsPage() {
    const { data, isPending } = useQuery(offeringQueryOptions());

    const [isCreteModalOpen, setIsCreateModalOpen] = useState(false);

    const cards = data?.data.offerings.map(offering => (
        <OfferingCard
            offering={offering}
            isPending={isPending}
        />
    ));

    return (
        <Fragment>
            <OfferingHeader setIsCreateModalOpen={setIsCreateModalOpen} />
            
            <Flex>
                <Space>
                    {cards}
                </Space>
            </Flex>

            <Show when={isCreteModalOpen}>
                <CreateOfferingModal
                    isOpen={isCreteModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Show>
        </Fragment>
    );
}