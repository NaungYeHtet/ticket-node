import { validationResult } from 'express-validator'
import type { NextFunction, Request, Response } from 'express'

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): unknown {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  next()
}
