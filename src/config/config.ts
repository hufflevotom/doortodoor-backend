import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('config', () => ({
	port: process.env.PORT,
	mongodb_uri: process.env.MONGODB_URI,
	jwt_secret: process.env.JWT_SECRET,
	tipo: process.env.TIPO,
}));

export const validation = {
	PORT: Joi.number().required(),
	MONGODB_URI: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	TIPO: Joi.string().required(),
};
