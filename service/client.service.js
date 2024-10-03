const clientModel = require("../model/client.model")

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