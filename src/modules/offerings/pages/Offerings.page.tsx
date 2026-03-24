import { useQuery } from '@tanstack/react-query';
import { offeringQueryOptions } from '../offerings.queries';
import { Flex, Typography } from 'antd';
import { Fragment } from 'react';
import { OfferingCard } from '../components/OfferingCard';

export function OfferingsPage() {
    const { data, isPending } = useQuery(offeringQueryOptions());

    const cards = data?.data.offerings.map(offering => (
        <OfferingCard
            offering={offering}
            isPending={isPending}
        />
    ));

    return (
        <Fragment>
            <Typography.Title level={2}>Serviços</Typography.Title>
            
            <Flex>
                {cards}
            </Flex>
        </Fragment>
    );
}