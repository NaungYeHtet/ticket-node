import request from 'supertest'
import app from '../../src/app'
import { it } from 'node:test'

it('returns 200 OK whern sign up request is valid', () => {
  request(app)
    .post('/api/v1/users')
    .send({
      name: 'naungyehtet',
      email: 'naungyehtet717@gmail.com',
      password: '123456'
    })
    .expect(200)
})
