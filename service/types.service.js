const typesModel = require("../model/types.model");

class TypesService {
  async create(name, author) {
    const newTypes = await typesModel.create({
      name,
      author,
    });
    return newTypes;
  }
}

module.exports = new TypesService();
