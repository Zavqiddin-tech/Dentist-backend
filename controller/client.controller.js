const clientService = require("../service/client.service");

class ClientController {
  async create(req, res, next) {
    try {
      const newClient = await clientService.create(
        req.body,
        req.user.id
      );
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClientController();
