import { body } from 'express-validator'

const schema = [
  body('ticketId')
    .notEmpty()
    .isString()
    .withMessage('Validation error.'),
]

export { schema as TicketApproveRequest }
