import Fasilitas from '#models/fasilita'
import type { HttpContext } from '@adonisjs/core/http'

export default class FasilitasController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    return Fasilitas.query().paginate(page)
  }

  async store({ request }: HttpContext) {
    return Fasilitas.create(request.all())
  }

  async show({ params }: HttpContext) {
    return Fasilitas.findOrFail(params.id)
  }
}