import { body } from 'express-validator'

const schema = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a string.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
    })
    .withMessage(
      'Password must be 8 characters in length, contain one lowercase letter, one uppercase letter and one number.'
    ),
]

export { schema as registerRequest }
