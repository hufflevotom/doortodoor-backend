import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('config', () => ({
	port: process.env.PORT,
	user_db: process.env.USER_DB,
	password_db: process.env.PASSWORD_DB,
	host_db: process.env.HOST_DB,
	database: process.env.DATABASE,
	jwt_secret: process.env.JWT_SECRET,
	tipo: process.env.TIPO,
}));

export const validation = {
	PORT: Joi.number().required(),
	USER_DB: Joi.string().required(),
	PASSWORD_DB: Joi.string().required(),
	HOST_DB: Joi.string().required(),
	DATABASE: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	TIPO: Joi.string().required(),
};
