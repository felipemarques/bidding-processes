import { Schema } from 'mongoose'

export const BatchOperation = new Schema(
  {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    changed: {
      type: Number,
    },
    created: {
      type: Number,
    },
    deleted: {
      type: Number,
    },
    progress: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
)
