import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  _id: string;
  session: mongoose.Types.ObjectId;
  content: string;
  timestamp: number; // timestamp in seconds from session start
  order: number;
  type: 'text' | 'ai_summary' | 'ai_explanation' | 'highlight';
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>({
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  timestamp: {
    type: Number,
    required: true,
    min: 0
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['text', 'ai_summary', 'ai_explanation', 'highlight'],
    default: 'text'
  },
}, {
  timestamps: true
});

//indexes for performance
noteSchema.index({ session: 1, order: 1 });
noteSchema.index({ session: 1, timestamp: 1 });
noteSchema.index({ session: 1, type: 1 });

export const Note = mongoose.model<INote>('Note', noteSchema);
