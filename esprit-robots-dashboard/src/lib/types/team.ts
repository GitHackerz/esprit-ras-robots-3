export enum ChallengeType {
    JUNIOR = 'Junior',
    AUTONOMOUS = 'Autonomous',
    ALL_TERRAIN = 'All Terrain',
    FIGHTER = 'Fighter'
}

export interface Member {
    email?: string;
    name?: string;
    phone?: string;
}

export interface Team {
    _id: string;
    email: string;
    name: string;
    challenge: ChallengeType;
    establishment: string;
    club: string;
    members: Member[];
    score: number;
    isPaid: boolean;
    isPresent: boolean;
    hasCoffeeBreak: boolean;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Type for creating a new team
export type CreateTeamInput = Omit<Team, '_id' | 'createdAt' | 'updatedAt'>;

// Type for updating a team
export type UpdateTeamInput = Partial<CreateTeamInput>;

// Type for team response
export type TeamResponse = Team;
