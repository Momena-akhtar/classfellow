import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  _id: string;
  name: string;
  pdfUrl: string;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  pdfUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.pdf$/i.test(v);
      },
      message: 'PDF URL must be a valid URL ending with .pdf'
    }
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, {
  timestamps: true
});

//indexes for performance
bookSchema.index({ course: 1 });

export const Book = mongoose.model<IBook>('Book', bookSchema);
