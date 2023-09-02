import { Schema } from 'mongoose'

export const ImportedProcess = new Schema(
  {
    biddingCode: {
      type: Number,
      unique: true,
    },
    identification: {
      type: String,
    },
    processNumber: {
      type: String,
    },
    summary: {
      type: String,
    },
    publicNoticeStatusCode: {
      type: Number,
    },
    statusCode: {
      type: Number,
    },
    dateTimeStartBids: {
      type: Date,
    },
    items: [
      {
        amount: {
          type: Number,
        },
        refValue: {
          type: Number,
        },
        description: {
          type: String,
        },
        participationCode: {
          type: Number,
        },
        code: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false },
)
