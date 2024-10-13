const clientModel = require("../model/client.model")

class ClientService {
  async getAll(req, res) {
    const allClients = clientModel.find({ author: req.user.id });
    return allClients;
  }

  async create(body, author) {
    const newClient = await clientModel.create({
      ...body,
      author,
    });
    return newClient;
  }

  async getOne(id) {
    const client = await clientModel.findById(id);
    return client;
  }

  async edit(post, id) {
    if (!id) {
      throw new Error("id not found");
    }
    const updated = await clientModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updated;
  }

  async delete(id) {
    const client = await clientModel.findByIdAndDelete(id);
    return client;
  }

  // query
  async getSearch(author, search) {
    const client = await clientModel.find({
      author,
      firstName: {$regex: search, $options: 'i'}
    })
    return client
  }
}


module.exports = new ClientService()