import { Router } from 'express'
import * as AuthController from '../../controllers/auth'
import { validateRequest } from '../../middlewares/validateRequest'
import { LoginRequest } from '../../requests/auth/loginRequest'
import { authenticateToken } from '../../utils/authenticateToken'
import { registerRequest } from '../../requests/auth/registerRequest'

const router = Router()
router.post('/register', registerRequest, validateRequest, AuthController.register)
router.post('/login', LoginRequest, validateRequest, AuthController.login)
router.post('/logout', authenticateToken, AuthController.logout)

export default router
