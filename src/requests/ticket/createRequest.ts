import { body } from 'express-validator'

const schema = [
  body('title')
    .notEmpty()
    .withMessage('Ticket title is required.')
    .bail()
    .isString()
    .withMessage('Ticket title must be a string.'),
  body('description')
    .notEmpty()
    .withMessage('Description is required.')
    .bail()
    .isString()
    .withMessage('Description must be a string.')
]

export { schema as TicketCreateRequest }
