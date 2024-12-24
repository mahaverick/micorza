import { Router } from 'express'

import { UserController } from '@/controllers/user.controller'

const router = Router()
const userController = new UserController()

// require authentication
router.get('/', userController.getAllUsers)
router.get('/me', userController.getLoggedInUser)
router.get('/:username', userController.getUserByUsername)

export default router
