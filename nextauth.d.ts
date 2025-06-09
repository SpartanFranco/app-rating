import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			username: string;
			role: 'user' | 'admin';
			image: string;
		} & DefaultSession['user'];
	}
}
