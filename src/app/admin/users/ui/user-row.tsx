'use client';

import { useState } from 'react';
import { changeUserRole } from '@/actions/users/change-role-user';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { Role } from '@/generated/prisma';
import type { UserResponse } from '@/interfaces/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Props {
	user: UserResponse;
}

export const UserRow = ({ user }: Props) => {
	const [currentRole, setCurrentRole] = useState<UserResponse['role']>(
		user.role,
	);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: {
			userId: string;
			role: UserResponse['role'];
		}) => {
			const res = await changeUserRole(data);
			if (!res.ok) throw new Error(res.msg || 'Algo ocurrió en el servidor');
			return res;
		},
	});

	const handleRoleChange = (value: UserResponse['role']) => {
		const previousRole = currentRole;

		toast.promise(mutateAsync({ userId: user.id, role: value }), {
			loading: 'Actualizando rol...',
			success: (data) => {
				setCurrentRole(value);
				return data.msg;
			},
			error: (error) => {
				setCurrentRole(previousRole);
				return error.message || 'Algo pasó en el servidor';
			},
		});
	};

	return (
		<TableRow className='transition-colors hover:bg-slate-700/30'>
			<TableCell>{user.username}</TableCell>
			<TableCell>{user.totalRatings}</TableCell>
			<TableCell>{user.totalComments}</TableCell>

			<TableCell>
				<Select
					value={currentRole}
					disabled={isPending}
					onValueChange={handleRoleChange}
				>
					<SelectTrigger className='bg-background text-foreground w-[140px]'>
						<SelectValue placeholder='Role' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={Role.user}>User</SelectItem>
						<SelectItem value={Role.admin}>Admin</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
		</TableRow>
	);
};
