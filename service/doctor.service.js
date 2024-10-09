const doctorModel = require("../model/doctor.model");
const fileService = require("./file.service");

class DoctorService {
  async getAll(req, res) {
    const allDoctors = doctorModel.find({ author: req.user.id });
    return allDoctors;
  }

  async create(body, picture, author) {
    const fileName = fileService.save(picture);
    const newDoctor = await doctorModel.create({
      ...body,
      picture: fileName,
      author,
    });
    return newDoctor;
  }

  async getOne(id) {
    const doctor = await doctorModel.findById(id);
    return doctor;
  }

  async edit(post, id) {
    if (!id) {
      throw new Error("id not found");
    }
    const updated = await doctorModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updated;
  }

  async delete(id) {
    const post = await doctorModel.findByIdAndDelete(id);
    return post;
  }
}

module.exports = new DoctorService();
