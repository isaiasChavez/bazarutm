import { User } from './user.entity'
import { CreateUserDTO, GetUserLoggedProfileDTO, GetUserProfileDTO, UpdateUserDTO } from './user.dto'
import { Profile } from '../profile/profile.entity'
import bcrypt from 'bcryptjs'
import { Role } from '../role/role.entity'
import { typesUser, Roles, ServiceReponse, ServerResponse } from '../../types'
import { Service } from '../interfaces/service.interface'

class UserService extends Service {

  statusOk = {
    status: this.HTTPResponses.Ok,
    msg: 'ok'
  }
  constructor () {
    super()
  }

  public async create (
    createUserDTO: CreateUserDTO
  ): Promise<ServiceReponse> {
    try {

      const { exist } = await this.getUser({
        email:createUserDTO.email
      })

      if (exist) {
        return {
          msg: 'This email is taked',
          status: this.HTTPResponses.BadRequest
        }
      }
      const profile: Profile = Profile.create({
        birthday: new Date(),
        gender: createUserDTO.gender,
        lastname: createUserDTO.lastname,
        name: createUserDTO.name,
        phonenumber: createUserDTO.phonenumber
      })

      await Profile.save(profile)

      const password: string = await bcrypt.hash(createUserDTO.password, 12)

      const role = await Role.findOne({
        where: {
          name: Roles.user
        }
      })
      if (!role) {
        throw new Error("No existe el rol")
      }

      const user = User.create({
        email: createUserDTO.email,
        password,
        profile,
        role,
        type: typesUser.user
      })
      await User.save(user)

      return {
        msg:'ok',
        status:this.HTTPResponses.OkCreated
      }

    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('createUser', error)
      }
    }
  }
  public async update (updateDTO: UpdateUserDTO): Promise<ServiceReponse> {
    try {
      
      const { user, exist } = await this.getUser({
        email:updateDTO.email, 
        getProfile:true
      })

      if (!exist) {
        return {
          status: this.HTTPResponses.BadRequest,
          msg: 'user not found'
        }
      }

      let profile: Profile = user.profile
      if (updateDTO.name) profile.name = updateDTO.name
      if (updateDTO.lastname) profile.lastname = updateDTO.lastname
      if (updateDTO.gender) profile.gender = updateDTO.gender
      if (updateDTO.phonenumber) profile.phonenumber = updateDTO.phonenumber
      if (updateDTO.birthday) profile.birthday = new Date(updateDTO.birthday)

      await Profile.save(profile)

      return this.statusOk
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('updateUser', error)
      }
    }
  }

  public async getUserLoggedProfile (
    getProfileDTO: GetUserLoggedProfileDTO
  ): Promise<ServerResponse> {
    
    const { exist, profile,user } = await this.getUser({
      uuid:getProfileDTO.UUID,
      getProfile:true
    })

    if (!exist) {
      return {
        status: this.HTTPResponses.BadRequest,
        msg: 'user not found'
      }
    }
    console.log({user,profile})
    const { CREATED_AT, id:id_, ...restprofile } = profile

    const {  id,password,uuid,profile:_, ...resuser } = user


    let data = {...resuser } as any
    data = {...data,...restprofile} 

    console.log({data})

    return {
      ...this.statusOk,
      data
    }
  }

  public async getUserProfile (
    getProfileDTO: GetUserProfileDTO
  ): Promise<ServerResponse> {
    
    const { exist, profile } = await this.getUser({
      email:getProfileDTO.email, 
      getProfile:true
    })
    if (!exist) {
      return {
        status: this.HTTPResponses.BadRequest,
        msg: 'user not found'
      }
    }

    const { CREATED_AT, id, ...rest } = profile
    const data = rest

    return {
      ...this.statusOk,
      data
    }
  }

  private async getUser (data:{email?: string,
    uuid?: string,
    getProfile?: boolean}): Promise<{ exist: boolean; user?: User; profile?: Profile }> {
    let user:User  
    if (data.email) {
      user = await User.findOne({
        where: { email:data.email },
        relations: data.getProfile ? ['profile'] : []
      })
    }
    if (data.uuid) {
      user = await User.findOne({
        where: { uuid:data.uuid },
        relations: data.getProfile ? ['profile'] : []
      })
      console.log({user})
    }
    if (!user) {
      return { exist: false }
    }

    return { exist: true, user,profile:user.profile }
  }

  public async delete (userEmail: string): Promise<ServiceReponse> {
    try {
      const user: User = await User.findOne({
        where: {
          email: userEmail
        }
      })
      console.log({ user })
      if (!user) {
        return {
          status: this.HTTPResponses.BadRequest,
          msg: 'user not found'
        }
      }
      await User.remove(user)
      return this.statusOk
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateProduct",error)
      }
    }
  }
}

export default UserService
