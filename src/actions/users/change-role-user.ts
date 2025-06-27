'use server';

import prisma from '@/lib/prisma';
import { validateAdminOrSuperAdmin } from '@/lib/validate-admin';
import { AdminOrUser } from '@/interfaces/user';

interface UserData {
	userId: string;
	role: AdminOrUser;
}

export const changeUserRole = async ({ userId, role }: UserData) => {
	try {
		await validateAdminOrSuperAdmin(['superAdmin']);
		const user = await prisma.user.findFirst({ where: { id: userId } });
		if (!user) throw new Error('El usuario no existe');
		if (user.role === role)
			throw new Error(`EL usuario ${user.username} ya tiene ese role`);
		await prisma.user.update({ where: { id: userId }, data: { role } });
		return {
			ok: true,
			msg: `Se actualizo el rol del usuario ${user.username}`,
		};
	} catch (error) {
		return {
			ok: false,
			msg:
				error instanceof Error
					? error.message
					: 'No se pudo cambiar el role del usuario',
		};
	}
};
