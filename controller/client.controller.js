const clientService = require("../service/client.service");

class ClientController {
  async getAll(req, res, next) {
    try {
      const allDoctors = await clientService.getAll(req, res);
      res.status(200).json(allDoctors);
    } catch (error) {
      next(error);
    }
  }

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

  async getOne(req, res, next) {
    try {
      const client = await clientService.getOne(req.params.id);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }
  
  async getSearch(req, res, next) {
    try {
      const client = await clientService.getSearch(req.query.search);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const client = await clientService.edit(body, params.id);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleteClient = await clientService.delete(req.params.id);
      res.status(200).json(deleteClient);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClientController();
