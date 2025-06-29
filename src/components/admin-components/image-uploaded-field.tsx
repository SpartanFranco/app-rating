'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
	value: {
		url: string;
		public_id: string;
	};
	onChange: (val: { url: string; public_id: string }) => void;
	onError?: (msg: string) => void;
	resetError?: () => void;
}

export const ImageUploadField = ({
	value,
	onChange,
	onError,
	resetError,
}: Props) => {
	const [isUploading, setIsUploading] = useState(false);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		resetError?.();

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});
			const data = await res.json();

			if (!data.ok) throw new Error(data.error || 'Error al subir imagen');
			onChange(data);

			// Guardar el public_id temporalmente en localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem('temp_uploaded_public_id', data.public_id);
			}
		} catch (err) {
			console.error(err);
			onError?.('Error al subir la imagen');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div>
			<label className='mb-1 block text-sm font-medium'>Imagen</label>

			<label className='inline-block cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
				{value.url ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
				<Input
					type='file'
					accept='image/*'
					onChange={handleImageChange}
					className='hidden'
				/>
			</label>

			{isUploading && (
				<p className='mt-2 text-sm text-yellow-400'>Subiendo imagen...</p>
			)}

			{value.url && !isUploading && (
				<div className='mt-4'>
					<p className='text-muted-foreground mb-1 text-sm'>Vista previa:</p>
					<img
						src={value.url}
						alt='Vista previa'
						className='border-border max-h-48 rounded-lg border'
					/>
				</div>
			)}
		</div>
	);
};
