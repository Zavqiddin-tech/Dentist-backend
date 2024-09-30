const postModel = require("../model/post.model");
const fileService = require("./file.service");

class PostServeice {
  async getAll() {
    const allPosts = await postModel.find();
    return allPosts;
  }

  async create(post, picture) {
    const fileName = fileService.save(picture);
    const newPost = await postModel.create({ ...post, picture: fileName });
    return newPost;
  }

  async delete(id) {
    const post = await postModel.findByIdAndDelete(id);
    return post;
  }

  async edit(post, id) {
    if (!id) {
      throw new Error("id not found");
    }
    const updated = await postModel.findByIdAndUpdate(id, post, { new: true });
    return updated;
  }

  async getOne(req, res) {
    const post = await postModel.findById(id);
    return post;
  }
}

module.exports = new PostServeice();
