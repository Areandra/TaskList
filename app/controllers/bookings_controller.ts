import Booking from '#models/booking'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookingsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    return Booking.query().paginate(page)
  }

  async store({ request }: HttpContext) {
    return Booking.create(request.all())
  }

  async show({ params }: HttpContext) {
    return Booking.findOrFail(params.id)
  }
}