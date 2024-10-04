const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const {
        userName,
        password,
        activated,
        firstName,
        lastName,
        hospital,
        phone,
        role,
      } = req.body;
      const data = await authService.register(
        userName,
        password,
        activated,
        firstName,
        lastName,
        hospital,
        phone,
        role
      );

      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const data = await authService.login(userName, password);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.headers;
      const token = await authService.logout(refreshToken);
      res.json({ token });
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.headers;
      const data = await authService.refresh(refreshToken);
      return res.json(data);
    } catch (error) {
      next(error)
    }
  }

  // check
  async checkUser(req, res) {
    res.status(200).json({ message: "User is authenticated"})
  }
}

module.exports = new AuthController();
