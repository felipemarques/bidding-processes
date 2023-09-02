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
  },
  { timestamps: true, versionKey: false },
)
