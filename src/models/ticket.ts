import { type InferSchemaType, Schema, model, type Document } from 'mongoose'

export interface TicketDocument extends Document {
  avatar: string
  title: string
  description: string
  createdBy: string
  status: string
  supervisorId: string
  leaderId: string
}

interface TicketSchemaType {
  title: { type: string; required: true }
  description: { type: string; required: true }
  status: { type: string; required: true }
  createdBy: {
    type: string
    required: true
  }
  supervisorId: {
    type: string
    required: false
  }
  leaderId: {
    type: string
    required: false
  }
}

const ticketSchema = new Schema<TicketSchemaType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    supervisorId: { type: String, required: false },
    leaderId: { type: String, required: false },
    status: String
  },
  { timestamps: true }
)

export const TicketModel = model<InferSchemaType<TicketSchemaType>>(
  'Ticket',
  ticketSchema
)
