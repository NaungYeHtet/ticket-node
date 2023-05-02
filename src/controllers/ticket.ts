/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextFunction, RequestHandler, Request, Response } from 'express'
import { TicketModel, type TicketDocument } from '../models/ticket'
import pusher from '../utils/pusher'
import mongoose from 'mongoose'

interface AuthenticatedRequest extends Request {
  user: {
    id: string
  }
}

export const getTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  TicketModel.find()
    .exec()
    .then((ticket) => {
      res.status(200).json(ticket)
    })
    .catch((error) => {
      next(error)
    })
}

interface CreateTicketBody {
  title?: string
  description?: string
}

export const createTicket: RequestHandler<
  unknown,
  unknown,
  CreateTicketBody,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body

    if (title === null || description === null) {
      return res.status(400)
    }

    const user = (req as AuthenticatedRequest).user
    // Create new ticket
    const createdTicket = new TicketModel({
      title,
      description,
      createdBy: user.id,
      status: 'Pending'
    })
    await createdTicket.save()

    await pusher.trigger('tickets', 'ticket-created', { id: createdTicket.id })

    return res
      .status(201)
      .json({ message: 'Ticket created successfully', createdTicket })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const approveTicket: RequestHandler<
  unknown,
  unknown,
  { ticketId: string },
  unknown
> = async (req, res: Response, next: NextFunction) => {
  try {
    const { ticketId } = req.body

    if (ticketId === null) {
      return res.status(400)
    }

    if (!mongoose.isValidObjectId(ticketId)) {
      return res.status(400)
    }

    const ticket = await TicketModel.findById(ticketId).exec()

    if (ticket == null) {
      return res.status(404)
    }

    const typedTicket = ticket as TicketDocument

    typedTicket.status = 'Approved'

    const updatedTicket = await typedTicket.save()

    return res
      .status(200)
      .json({ message: 'Ticket created successfully', updatedTicket })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
