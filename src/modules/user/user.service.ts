import { User } from './user.entity'
import { CreateUserDTO } from './user.dto'

interface ServiceReponse {
  status: number
  msg: string
}

class UserService {
  statusOk
  constructor () {
    this.statusOk = {
        status: 400,
        msg: 'ok'
      }
  }

  async createUser (createUserDTO: CreateUserDTO): Promise<ServiceReponse> {
    try {
      const newUser = User.create(createUserDTO)
      User.save(newUser) 
      return this.statusOk
    } catch (error) {
      console.log('Error creating user')
      return {
        status: 500,
        msg: 'Error creating user'
      }
    }
  }
  async deleteUser (userEmail: string): Promise<ServiceReponse> {
    try {

      const user: User = await User.findOne({
        where:{
          email:userEmail
        }
      })
      console.log({user})
      if (!user) {
        return {
          status: 404,
          msg: 'user not found'
        }
      }
      await User.remove(user)
      return this.statusOk
    } catch (error) {
      console.log('Error deleting user')
      return {
        status: 400,
        msg: 'ok'
      }
    }
  }
}

export default UserService