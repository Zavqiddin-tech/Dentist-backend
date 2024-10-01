const typesService = require("../service/types.service");

class TypesController {
  async create(req, res, next) {
    try {
      const newTypes = await typesService.create(
        req.body.name,
        req.user.id
      );
      res.status(201).json(newTypes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TypesController();
