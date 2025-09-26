import type { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    when: boolean,
}

export function Show({ children, when }: Props) {
    return when ? children : null;
}