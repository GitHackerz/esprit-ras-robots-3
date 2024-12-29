'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/lib/types/user';
import { Chip } from '@nextui-org/chip';
import { ColumnDef } from '@tanstack/react-table';

const statusColorMap = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-red-100 text-red-700',
    verified: 'bg-blue-100 text-blue-700',
    unverified: 'bg-yellow-100 text-yellow-700'
};

export const usersColumns: ColumnDef<User>[] = [
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
        header: 'Name',
        accessorKey: 'name',
        enableSorting: true
    },
    {
        header: 'Email',
        accessorKey: 'email',
        enableSorting: true
    },
    {
        header: 'Phone',
        accessorKey: 'phone',
        enableSorting: true
    },
    {
        header: 'Role',
        accessorKey: 'role',
        enableSorting: true
    },
    {
        header: 'Active Status',
        accessorKey: 'isActive',
        enableSorting: true,
        cell: ({ row }) => {
            const isActive = row.getValue('isActive') as boolean;
            return (
                <Chip
                    className={isActive ? statusColorMap.active : statusColorMap.inactive}
                    size='sm'
                    variant='flat'>
                    {isActive ? 'Active' : 'Inactive'}
                </Chip>
            );
        }
    },
    {
        header: 'Verification',
        accessorKey: 'isVerified',
        enableSorting: true,
        cell: ({ row }) => {
            const isVerified = row.getValue('isVerified') as boolean;
            return (
                <Chip
                    className={isVerified ? statusColorMap.verified : statusColorMap.unverified}
                    size='sm'
                    variant='flat'>
                    {isVerified ? 'Verified' : 'Unverified'}
                </Chip>
            );
        }
    }
];
