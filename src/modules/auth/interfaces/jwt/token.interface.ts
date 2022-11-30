import { ObjectId } from 'mongoose';

export interface PayloadToken {
	role: ObjectId;
	sub: ObjectId;
}
