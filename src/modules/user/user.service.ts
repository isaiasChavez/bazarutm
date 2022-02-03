import { ConfigurationUser } from './../configuration/configurationUser.entity';
import { User } from "./user.entity";
import {
  CreateUserDTO,
  GetUserLoggedProfileDTO,
  GetUserProfileDTO,
  UpdateUserDTO,
  UpdateUserProfileDTO,
} from "./user.dto";
import { Profile } from "../profile/profile.entity";
import bcrypt from "bcryptjs";
import { Role } from "../role/role.entity";
import { typesUser, Roles, ServiceReponse, ServerResponse } from "../../types";
import { Service } from "../interfaces/service.interface";
import { Request } from "express";

class UserService extends Service {
  statusOk = {
    status: this.HTTPResponses.Ok,
    msg: "ok",
  };
  constructor() {
    super();
  }

  public async create(createUserDTO: CreateUserDTO): Promise<ServiceReponse> {
    try {
      const { exist } = await this.getUser({
        email: createUserDTO.email,
      });

      if (exist) {
        return {
          msg: "This email is taked",
          status: this.HTTPResponses.BadRequest,
        };
      }
      const profile: Profile = Profile.create({
        birthday: new Date(),
        gender: createUserDTO.gender,
        lastname: createUserDTO.lastname,
        name: createUserDTO.name,
        phonenumber: createUserDTO.phonenumber,
      });

      await Profile.save(profile);

      const password: string = await bcrypt.hash(createUserDTO.password, 12);

      const role = await Role.findOne({
        where: {
          name: Roles.user,
        },
      });
      if (!role) {
        throw new Error("No existe el rol");
      }

      const configurationUser = ConfigurationUser.create();
      await configurationUser.save()

      const user = User.create({
        email: createUserDTO.email,
        password,
        profile,
        role,
        type: typesUser.user,
        configurationUser
      });
      
      await User.save(user);

      return {
        msg: "ok",
        status: this.HTTPResponses.OkCreated,
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("createUser", error),
      };
    }
  }
  public async update(
    updateDTO: UpdateUserProfileDTO,
    req: Request
  ): Promise<ServerResponse> {
    try {
      const user: User = req.body.user;

      let profile: Profile = user.profile;

      let userWithSameTelegram: User;
      let userWithSameInstagram: User;
      let userWithSamePhoneNumber: User;

      const telegramHasChanged: boolean =
        updateDTO.telegram && profile.telegram !== updateDTO.telegram;
      const instagramHasChanged: boolean =
        updateDTO.instagram && profile.instagram !== updateDTO.instagram;
      const phoneHasChanged: boolean =
        updateDTO.phonenumber && profile.phonenumber !== updateDTO.phonenumber;

        if (phoneHasChanged) {
          userWithSamePhoneNumber = await User.findOne({
            where: {
              profile: {
                phonenumber: updateDTO.phonenumber,
              },
            },
            relations:["profile"]
          });
          if (!userWithSamePhoneNumber) profile.instagram = updateDTO.instagram;
        }

        if (telegramHasChanged) {
          userWithSameTelegram = await User.findOne({
            where: {
              profile: {
                telegram: updateDTO.telegram,
              },
            },
            relations:["profile"]
          });
          if (!userWithSameTelegram) profile.telegram = updateDTO.telegram;
        }
        if (instagramHasChanged) {
          userWithSameInstagram = await User.findOne({
            where: {
              profile: {
                instagram: updateDTO.instagram,
              },
            },
            relations:["profile"]

          });
          if (!userWithSameInstagram) profile.instagram = updateDTO.instagram;
        }
      if (updateDTO.phonenumber) profile.phonenumber = updateDTO.phonenumber;

      await Profile.save(profile);

      return {
        ...this.statusOk,
      data:{
        ...profile
      }
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateUser", error),
      };
    }
  }


  public async updateUserAvatar(
    avatar:string,
    user: User
  ): Promise<ServerResponse> {
    try {

      let profile: Profile = user.profile;

      profile.avatar = avatar;

      await Profile.save(profile);

      return {
        ...this.statusOk,
      data:avatar
      
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateUser", error),
      };
    }
  }


  public async getUserLoggedProfile(
    getProfileDTO: GetUserLoggedProfileDTO
  ): Promise<ServerResponse> {

    const { exist, profile, user,configuration} = await this.getUser({
      uuid: getProfileDTO.UUID,
      getProfile: true,
      getConfiguration:true
    });

    if (!exist) {
      return {
        status: this.HTTPResponses.BadRequest,
        msg: "user not found",
      };
    }
    const { CREATED_AT, id: id_, ...restprofile } = profile;

    const { id, password, uuid, profile: _, ...resuser } = user;
    const { id:id__, ...resconfig } = configuration;

    

    let data = { ...resuser } as any;
    data = { ...data, ...restprofile };


    return {
      ...this.statusOk,
      data,
    };
  }

  public async getUserProfile(
    getProfileDTO: GetUserProfileDTO
  ): Promise<ServerResponse> {
    const { exist, profile,configuration } = await this.getUser({
      email: getProfileDTO.email,
      getProfile: true,
      getConfiguration:true
    });
    if (!exist) {
      return {
        status: this.HTTPResponses.BadRequest,
        msg: "user not found",
      };
    }

    const { CREATED_AT, id, ...rest } = profile;

    const data = rest;

    return {
      ...this.statusOk,
      data:{
        profile:rest,
        configuration
      },
    };
  }

  private async getUser(data: {
    email?: string;
    uuid?: string;
    getProfile?: boolean;
    getConfiguration?: boolean;

  }): Promise<{ exist: boolean; user?: User; profile?: Profile; configuration?: ConfigurationUser }> {
    let user: User;

    const relations = []
    if (data.getProfile) relations.push('profile')
    if (data.getConfiguration) relations.push('configurationUser')
    

    if (data.email) {
      user = await User.findOne({
        where: { email: data.email },
        relations,
      });
    }
    if (data.uuid) {
      user = await User.findOne({
        where: { uuid: data.uuid },
        relations
      });
    }
    if (!user) {
      return { exist: false };
    }

    return { exist: true, user, profile: user.profile,configuration:user.configurationUser };
  }

  public async delete(userEmail: string): Promise<ServiceReponse> {
    try {
      const user: User = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        return {
          status: this.HTTPResponses.BadRequest,
          msg: "user not found",
        };
      }
      await User.remove(user);
      return this.statusOk;
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateProduct", error),
      };
    }
  }
}

export default UserService;
