'use client'

import { teamsColumns } from "@/components/tables/columns/teams-columns";
import { usersColumns } from "@/components/tables/columns/users-columns";
import { DataTable } from "@/components/tables/data-table";
import { mockTeams } from "@/constants/mock-teams";
import { mockUsers } from "@/constants/mock-users";

export default function Home() {

  return (
    <div className="w-full max-w-full p-24">
      <DataTable
        columns={usersColumns}
        data={mockUsers}
        isSorting
        isFiltering
        isPaginating
        isSelecting
        title="Users List"
        limit={10}
      />

      <DataTable
        columns={teamsColumns}
        data={mockTeams}
        isSorting
        isFiltering
        isPaginating
        isSelecting
        title="Teams List"
        limit={10}
      />
    </div>
  );
}
