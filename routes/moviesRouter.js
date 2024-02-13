import { Router } from 'express'
import { MoviesController } from '../controller/moviesController.js'

const moviesRuter = Router()

moviesRuter.get('/', MoviesController.getAll)
moviesRuter.get('/:id', MoviesController.getById)

moviesRuter.post('/', MoviesController.create)
moviesRuter.delete('/:id', MoviesController.delete)
moviesRuter.patch('/:id', MoviesController.patch)

export default moviesRuter
