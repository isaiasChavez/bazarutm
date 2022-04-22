"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurationUser_entity_1 = require("./../configuration/configurationUser.entity");
const user_entity_1 = require("./user.entity");
const profile_entity_1 = require("../profile/profile.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const role_entity_1 = require("../role/role.entity");
const types_1 = require("../../types");
const service_interface_1 = require("../interfaces/service.interface");
class UserService extends service_interface_1.Service {
    constructor() {
        super();
        this.statusOk = {
            status: this.HTTPResponses.Ok,
            msg: "ok",
        };
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_entity_1.User.createQueryBuilder('user')
                .select("user.email")
                .leftJoin('user.profile', 'profile')
                .addSelect('profile.name')
                .getMany();
            return Object.assign(Object.assign({}, this.statusOk), { data: {
                    users
                } });
        });
    }
    create(createUserDTO, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { exist } = yield this.getUser({
                    email: createUserDTO.email,
                });
                if (exist) {
                    return {
                        msg: "This email is taked",
                        status: this.HTTPResponses.BadRequest,
                    };
                }
                const profile = profile_entity_1.Profile.create({
                    birthday: new Date(createUserDTO.birthday),
                    gender: createUserDTO.gender,
                    lastname: createUserDTO.lastname,
                    name: createUserDTO.name,
                    phonenumber: createUserDTO.phonenumber,
                });
                yield profile_entity_1.Profile.save(profile);
                const password = yield bcryptjs_1.default.hash(createUserDTO.password, 12);
                const roleUser = yield role_entity_1.Role.findOne({
                    where: {
                        name: role,
                    },
                });
                if (!roleUser) {
                    throw new Error("No existe el rol");
                }
                const configurationUser = configurationUser_entity_1.ConfigurationUser.create();
                yield configurationUser.save();
                const user = user_entity_1.User.create({
                    email: createUserDTO.email,
                    password,
                    profile,
                    role: roleUser,
                    type: types_1.typesUser.user,
                    configurationUser
                });
                yield user_entity_1.User.save(user);
                return {
                    msg: "ok",
                    status: this.HTTPResponses.OkCreated,
                };
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("createUser", error),
                };
            }
        });
    }
    update(updateDTO, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                let profile = user.profile;
                let userWithSameTelegram;
                let userWithSameInstagram;
                let userWithSamePhoneNumber;
                const telegramHasChanged = updateDTO.telegram && profile.telegram !== updateDTO.telegram;
                const instagramHasChanged = updateDTO.instagram && profile.instagram !== updateDTO.instagram;
                const phoneHasChanged = updateDTO.phonenumber && profile.phonenumber !== updateDTO.phonenumber;
                if (phoneHasChanged) {
                    userWithSamePhoneNumber = yield user_entity_1.User.findOne({
                        where: {
                            profile: {
                                phonenumber: updateDTO.phonenumber,
                            },
                        },
                        relations: ["profile"]
                    });
                    if (!userWithSamePhoneNumber)
                        profile.instagram = updateDTO.instagram;
                }
                if (telegramHasChanged) {
                    userWithSameTelegram = yield user_entity_1.User.findOne({
                        where: {
                            profile: {
                                telegram: updateDTO.telegram,
                            },
                        },
                        relations: ["profile"]
                    });
                    if (!userWithSameTelegram)
                        profile.telegram = updateDTO.telegram;
                }
                if (instagramHasChanged) {
                    userWithSameInstagram = yield user_entity_1.User.findOne({
                        where: {
                            profile: {
                                instagram: updateDTO.instagram,
                            },
                        },
                        relations: ["profile"]
                    });
                    if (!userWithSameInstagram)
                        profile.instagram = updateDTO.instagram;
                }
                if (updateDTO.phonenumber)
                    profile.phonenumber = updateDTO.phonenumber;
                yield profile_entity_1.Profile.save(profile);
                return Object.assign(Object.assign({}, this.statusOk), { data: Object.assign({}, profile) });
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("updateUser", error),
                };
            }
        });
    }
    updateUserAvatar(avatar, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile = user.profile;
                profile.avatar = avatar;
                yield profile_entity_1.Profile.save(profile);
                return Object.assign(Object.assign({}, this.statusOk), { data: avatar });
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("updateUser", error),
                };
            }
        });
    }
    getUserLoggedProfile(getProfileDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exist, profile, user, configuration } = yield this.getUser({
                uuid: getProfileDTO.UUID,
                getProfile: true,
                getConfiguration: true
            });
            if (!exist) {
                return {
                    status: this.HTTPResponses.BadRequest,
                    msg: "user not found",
                };
            }
            const { CREATED_AT, id: id_ } = profile, restprofile = __rest(profile, ["CREATED_AT", "id"]);
            const { id, password, uuid, profile: _ } = user, resuser = __rest(user, ["id", "password", "uuid", "profile"]);
            const { id: id__ } = configuration, resconfig = __rest(configuration, ["id"]);
            let data = Object.assign({}, resuser);
            data = Object.assign(Object.assign({}, data), restprofile);
            return Object.assign(Object.assign({}, this.statusOk), { data });
        });
    }
    getUserProfile(getProfileDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exist, profile, configuration } = yield this.getUser({
                email: getProfileDTO.email,
                getProfile: true,
                getConfiguration: true
            });
            if (!exist) {
                return {
                    status: this.HTTPResponses.BadRequest,
                    msg: "user not found",
                };
            }
            const { CREATED_AT, id } = profile, rest = __rest(profile, ["CREATED_AT", "id"]);
            const data = rest;
            return Object.assign(Object.assign({}, this.statusOk), { data: {
                    profile: rest,
                    configuration
                } });
        });
    }
    getUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const relations = [];
            if (data.getProfile)
                relations.push('profile');
            if (data.getConfiguration)
                relations.push('configurationUser');
            if (data.email) {
                user = yield user_entity_1.User.findOne({
                    where: { email: data.email },
                    relations,
                });
            }
            if (data.uuid) {
                user = yield user_entity_1.User.findOne({
                    where: { uuid: data.uuid },
                    relations
                });
            }
            if (!user) {
                return { exist: false };
            }
            return { exist: true, user, profile: user.profile, configuration: user.configurationUser };
        });
    }
    delete(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_entity_1.User.findOne({
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
                yield user_entity_1.User.remove(user);
                return this.statusOk;
            }
            catch (error) {
                return {
                    status: this.HTTPResponses.InternalError,
                    msg: this.eH.genericHandler("updateProduct", error),
                };
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map