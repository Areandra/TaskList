import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    return User.query().paginate(page)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    return User.create(payload)
  }

  async show({ params }: HttpContext) {
    return User.findOrFail(params.id)
  }
}