export const customResponse = (
	message = 'Operacion Exitosa',
	body = null,
	statusCode = 200,
	total = null,
) => {
	return {
		statusCode,
		message,
		body: JSON.parse(JSON.stringify(body)),
		total,
	};
};
