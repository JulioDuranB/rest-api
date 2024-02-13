import { MovieModel } from '../models/movieModel.js'
import { validateMovie, validatePartialMovie } from '../schemas/moviesSchemas.js'

export class MoviesController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movie = await MovieModel.getAll({ genre })
    res.json(movie)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie2 = await MovieModel.getById({ id })
    if (movie2) return res.json(movie2)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async patch (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await MovieModel.update({ id, input: result.data })

    if (updateMovie === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json(updateMovie)
  }
}
