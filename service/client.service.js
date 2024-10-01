const clientModel = require("../model/client.model")
const fileService = require("./file.service");

class ClientService {
  async create(body, author) {
    const newClient = await clientModel.create({
      ...body,
      author,
    });
    return newClient;
  }
}


module.exports = new ClientService()