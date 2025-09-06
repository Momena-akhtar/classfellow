import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  _id: string;
  name: string;
  description: string;
  books: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
}, {
  timestamps: true
});

//indexes for performance
courseSchema.index({ name: 1 });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
