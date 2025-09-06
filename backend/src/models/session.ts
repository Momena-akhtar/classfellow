import mongoose, { Schema, Document } from 'mongoose';

export interface ISessionMeta {
  additionalLinks?: string[];
  referenceMaterials?: string[];
  aiSummary?: string;
  transcription?: string;
  keywords?: string[];
  duration?: number;
}

export interface ISession extends Document {
  _id: string;
  course: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  started: Date;
  ended?: Date;
  meta: ISessionMeta;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionMetaSchema = new Schema<ISessionMeta>({
  additionalLinks: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Links must be valid URLs'
    }
  }],
  referenceMaterials: [String],
  aiSummary: {
    type: String,
    maxlength: 5000
  },
  transcription: {
    type: String,
    maxlength: 50000
  },
  keywords: [String],
  duration: {
    type: Number,
    min: 0
  }
}, { _id: false });

const sessionSchema = new Schema<ISession>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  started: {
    type: Date,
    required: true,
    default: Date.now
  },
  ended: {
    type: Date,
    default: null
  },
  meta: {
    type: sessionMetaSchema,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

//indexes for performance
sessionSchema.index({ course: 1, student: 1 });
sessionSchema.index({ student: 1, started: -1 });
sessionSchema.index({ isActive: 1 });
sessionSchema.index({ started: -1 });

export const Session = mongoose.model<ISession>('Session', sessionSchema);
