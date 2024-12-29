import { ChallengeType, Team } from "@/lib/types/team";

export const mockTeams: Team[] = [
    {
        _id: "1",
        email: "team1@example.com",
        name: "Robotics Elite",
        challenge: ChallengeType.JUNIOR,
        establishment: "ESPRIT",
        club: "Robotics Club",
        members: [
            { name: "Member 1", email: "member1@example.com", phone: "+1234567893" },
            { name: "Member 2", email: "member2@example.com", phone: "+1234567894" }
        ],
        score: 85,
        isPaid: true,
        isPresent: true,
        hasCoffeeBreak: false,
        paymentDate: new Date("2024-01-15"),
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15")
    },
    {
        _id: "2",
        email: "team2@example.com",
        name: "Tech Warriors",
        challenge: ChallengeType.AUTONOMOUS,
        establishment: "INSAT",
        club: "Tech Club",
        members: [
            { name: "Member 3", email: "member3@example.com", phone: "+1234567895" }
        ],
        score: 92,
        isPaid: false,
        isPresent: true,
        hasCoffeeBreak: true,
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-15")
    },
    {
        _id: "3",
        email: "team3@example.com",
        name: "Bot Masters",
        challenge: ChallengeType.FIGHTER,
        establishment: "ENIT",
        club: "Engineering Club",
        members: [
            { name: "Member 4", email: "member4@example.com", phone: "+1234567896" },
            { name: "Member 5", email: "member5@example.com", phone: "+1234567897" }
        ],
        score: 78,
        isPaid: true,
        isPresent: false,
        hasCoffeeBreak: false,
        paymentDate: new Date("2024-01-10"),
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-15")
    }
];
