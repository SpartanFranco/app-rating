import { FeedbackType, Role } from '@/generated/prisma';

export interface UserResponse {
	totalRatings: number;
	totalComments: number;
	Feedback: {
		type: FeedbackType;
	}[];
	id: string;
	username: string;
	password: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date | null;
}
