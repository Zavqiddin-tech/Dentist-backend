const clientModel = require("../model/client.model")

class ClientService {
  async getAll(req, res) {
    console.log(req.user);
    const allDoctors = clientModel.find({ author: req.user.id });
    return allDoctors;
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
}


module.exports = new ClientService()