// src/controllers/user.controller.ts

import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

import { BaseController } from '@/controllers/base.controller'
import { UserRepository } from '@/repositories/user.repository'
import { hashPassword } from '@/utils/auth.utils'

export class UserController extends BaseController {
  /**
   * UserRepository
   * @type {UserRepository}
   */
  private userRepo: UserRepository

  /**
   * Constructor  - Initialize UserController
   */
  constructor() {
    super()
    this.userRepo = new UserRepository()
  }

  /**
   * Get all users
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   */
  getAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const users = await this.userRepo.getAll()
      return this.sendResponse(res, { users }, 200, 'All users')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Create a new user
   * @param {Request} req - Request object
   * @param {Request} req.body - Request object
   * @param {Response} res - Response object
   */
  createUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, firstName, username, password } = req.body
      const passwordHash = await hashPassword(password)

      const user = await this.userRepo.create({
        firstName,
        username,
        email,
        password: passwordHash,
      })
      return this.sendResponse(res, { user }, 201, 'User created')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Get logged in user
   * @param {Request} req - Request object
   * @param {object} req.params - Request parameters
   * @param {Response} res - Response object
   */
  getLoggedInUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId

    try {
      const user = await this.userRepo.findById(userId)

      if (!user) {
        return this.sendError(res, 'User not found', 404)
      }

      return this.sendResponse(res, { user }, 200, 'Logged in user')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Get single user by id
   * @param {Request} req - Request object
   * @param {object} req.params - Request parameters
   * @param {Response} res - Response object
   */
  getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
      const user = await this.userRepo.findById(userId)

      if (!user) {
        return this.sendError(res, 'User not found', 404)
      }

      return this.sendResponse(res, { user }, 200, 'User by id')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Get single user by email
   * @param {Request} req - Request object
   * @param {object} req.params - Request parameters
   * @param {Response} res - Response object
   */
  getUserByEmail = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params

    try {
      const user = await this.userRepo.findByEmail(email)

      if (!user) {
        return this.sendError(res, 'User not found', 404)
      }

      return this.sendResponse(res, { user }, 200, 'User by email')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Get single user by username
   * @param {Request} req - Request object
   * @param {object} req.params - Request parameters
   * @param {Response} res - Response object
   */
  getUserByUsername = expressAsyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params

    try {
      const user = await this.userRepo.findByUsername(username)

      if (!user) {
        return this.sendError(res, 'User not found', 404)
      }

      return this.sendResponse(res, { user }, 200, 'User by username')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })

  /**
   * Delete a user
   * @param {Request} req - Request object
   * @param {object} req.params - Request parameters
   * @param {Response} res - Response object
   */
  deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const user = await this.userRepo.softDelete(Number(id))

      if (!user) {
        return this.sendError(res, 'User not found', 404)
      }

      return this.sendResponse(res, { user }, 200, 'User deleted')
    } catch (e) {
      const error = e as Error
      return this.sendError(res, error.message, 500)
    }
  })
}
