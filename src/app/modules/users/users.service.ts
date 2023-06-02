import config from '../../../config'
import APIError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const id = await generateUserId()
  user.id = id
  const createdUser = await User.create(user)
  if (!createdUser) {
    // throw new Error('Failed to create user')
    throw new APIError(404, 'Failed to create user')
  }
  return createdUser
}
