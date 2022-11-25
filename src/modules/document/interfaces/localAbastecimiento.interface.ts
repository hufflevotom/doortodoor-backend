import { Document, ObjectId } from 'mongoose';

export interface LocalAbastecimiento extends Document {
	_id: ObjectId;
	localAbastecimiento: string;
	createdAt: Date;
	updatedAt: Date;
}
