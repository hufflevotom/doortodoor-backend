export function pathFile(archivo: Express.Multer.File): string {
	const pathWindows = archivo.path.split('\\');
	const pathLinux = archivo.path.split('/');

	let path;

	if (pathWindows.length > 1) {
		path =
			pathWindows[pathWindows.length - 3] +
			'/' +
			pathWindows[pathWindows.length - 2] +
			'/' +
			pathWindows[pathWindows.length - 1];
	} else {
		path =
			pathLinux[pathLinux.length - 3] +
			'/' +
			pathLinux[pathLinux.length - 2] +
			'/' +
			pathLinux[pathLinux.length - 1];
	}
	return path;
}
