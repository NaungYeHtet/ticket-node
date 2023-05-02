/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as TicketController from '../../controllers/ticket'
import { TicketCreateRequest } from '../../requests/ticket/createRequest'
import { validateRequest } from '../../middlewares/validateRequest'
import { TicketApproveRequest } from '../../requests/ticket/approveRequest'
import { can } from '../../utils/authorize'

const router = Router()
router.get('/', can('list ticket'), TicketController.getTickets)
router.post(
  '/',
  can('create ticket'),
  TicketCreateRequest,
  validateRequest,
  TicketController.createTicket
)
router.post(
  '/approve',
  can('approve ticket'),
  TicketApproveRequest,
  validateRequest,
  TicketController.approveTicket
)

export default router
