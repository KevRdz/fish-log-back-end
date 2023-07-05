import { Router } from 'express'
import * as fishesCtrl from '../controllers/fishes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, fishesCtrl.create)
router.get('/', fishesCtrl.index)
router.delete('/:id', checkAuth, fishesCtrl.delete)
router.put('/:id', checkAuth, fishesCtrl.update)
router.put('/:id/add-photo', checkAuth, fishesCtrl.addPhoto)

export { router }