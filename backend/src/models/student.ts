import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  photo?: string;
  university: string;
  courses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    photo: {
      type: String,
      default: null,
    },
    university: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//indexes for performance
studentSchema.index({ email: 1 });
studentSchema.index({ university: 1 });
studentSchema.index({ courses: 1 });

export const Student = mongoose.model<IStudent>("Student", studentSchema);
