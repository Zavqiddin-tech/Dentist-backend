const argon2 = require("argon2");
const tokenService = require("./token.service");
const userModel = require("../model/user.model");
const UserDto = require("../dto/user.dto");

class AuthService {
  async register(
    userName,
    password,
    activated,
    firstName,
    lastName,
    hospital,
    phone,
    role
  ) {
    const existUser = await userModel.findOne({ userName });

    if (existUser) {
      throw new Error(`User ${existUser.userName} oldin ro'yxatdan o'tgan`);
    }

    if (!password) {
      throw new Error(`parol ni ham kiriting`);
    }
    const hashPassword = await argon2.hash(password);
    const user = await userModel.create({
      userName,
      password: hashPassword,
      activated,
      firstName,
      lastName,
      hospital,
      phone,
      role,
    });

    // token generate
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    // refresh token save
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async login(userName, password) {
    const user = await userModel.findOne({ userName });

    if (!user) {
      throw new Error("User mavjud emas");
    }

    const isPassword = await argon2.verify(user.password, password);
    if (!isPassword) {
      throw new Error("Parol xato");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB) {
      throw new Error("Bad authorization");
    }

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);

    // token
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
