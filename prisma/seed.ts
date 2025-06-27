import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

(async () => {
	const data = [
		{
			title: 'black shirt',
			slug: 'black-shirt',
			image: '/products/1549268-00-A_2.jpg',
		},
		{
			title: 'socks',
			slug: 'socks',
			image: '/products/1741617-00-A_1_2000.jpg',
		},
		{
			title: 'black shirt cyberpunk',
			slug: 'black-shirt-cyberpunk',
			image: '/products/8529336-00-A_1.jpg',
		},

		{
			title: 'red shirt',
			slug: 'red-shirt',
			image: '/products/100042307_alt_2000.jpg',
		},
	];
	try {
		await Promise.all([
			await prisma.user.deleteMany(),
			await prisma.product.deleteMany(),
		]);

		await prisma.user.create({
			data: {
				username: '@geovani',
				password: bcrypt.hashSync('123456', 10),
				role: 'superAdmin',
			},
		});

		await prisma.product.createMany({
			data,
		});
		console.log('se ejecuto el seed correctamente');
	} catch (error) {
		console.log('No se pudo ejecutar el seed', { error });
	}
})();
