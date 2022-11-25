import { join } from 'path';

export const constantes = {
	pathFile:
		process.env.TIPO === 'PROD'
			? join(__dirname, '..', 'public', 'files') + '/'
			: join(__dirname, '..', '..', 'public', 'files') + '/',
	// pathFile: './dist/public/files/',
	removePath: 'public/',
	getPath:
		process.env.TIPO === 'PROD'
			? join(__dirname, '..', 'public') + '/'
			: join(__dirname, '..', '..', 'public') + '/',
};
