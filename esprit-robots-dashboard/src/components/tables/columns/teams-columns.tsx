'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Team } from '@/lib/types/team';
import { Chip } from '@nextui-org/chip';
import { ColumnDef } from '@tanstack/react-table';

const statusColorMap = {
    paid: 'bg-green-100 text-green-700',
    unpaid: 'bg-red-100 text-red-700',
    present: 'bg-blue-100 text-blue-700',
    absent: 'bg-yellow-100 text-yellow-700',
    coffee: 'bg-orange-100 text-orange-700',
    noCoffee: 'bg-gray-100 text-gray-700'
};

export const teamsColumns: ColumnDef<Team>[] = [
    {
        id: 'select',
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        header: 'Team Name',
        accessorKey: 'name',
        enableSorting: true
    },
    {
        header: 'Challenge',
        accessorKey: 'challenge',
        enableSorting: true
    },
    {
        header: 'Establishment',
        accessorKey: 'establishment',
        enableSorting: true
    },
    {
        header: 'Score',
        accessorKey: 'score',
        enableSorting: true,
        cell: ({ cell }) => {
            const score = cell.getValue() as number;
            return <span className='font-semibold'>{score}</span>;
        }
    },
    {
        header: 'Payment Status',
        accessorKey: 'isPaid',
        enableSorting: true,
        cell: ({ row }) => {
            const isPaid = row.getValue('isPaid') as boolean;
            return (
                <Chip
                    className={isPaid ? statusColorMap.paid : statusColorMap.unpaid}
                    size='sm'
                    variant='flat'>
                    {isPaid ? 'Paid' : 'Unpaid'}
                </Chip>
            );
        }
    },
    {
        header: 'Presence',
        accessorKey: 'isPresent',
        enableSorting: true,
        cell: ({ row }) => {
            const isPresent = row.getValue('isPresent') as boolean;
            return (
                <Chip
                    className={isPresent ? statusColorMap.present : statusColorMap.absent}
                    size='sm'
                    variant='flat'>
                    {isPresent ? 'Present' : 'Absent'}
                </Chip>
            );
        }
    },
    {
        header: 'Coffee Break',
        accessorKey: 'hasCoffeeBreak',
        enableSorting: true,
        cell: ({ row }) => {
            const hasCoffee = row.getValue('hasCoffeeBreak') as boolean;
            return (
                <Chip
                    className={hasCoffee ? statusColorMap.coffee : statusColorMap.noCoffee}
                    size='sm'
                    variant='flat'>
                    {hasCoffee ? 'Taken' : 'Not Yet'}
                </Chip>
            );
        }
    }
];
