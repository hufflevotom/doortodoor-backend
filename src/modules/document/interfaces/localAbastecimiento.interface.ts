import { Document } from 'mongoose';

export interface LocalAbastecimiento extends Document {
	_id: string;
	localAbastecimiento: string;
	createdAt: Date;
	updatedAt: Date;
}
