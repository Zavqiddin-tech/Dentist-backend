const doctorModel = require("../model/doctor.model");
const fileService = require("./file.service");

class DoctorService {
  async create(body, picture, author) {
    const fileName = fileService.save(picture);
    const newDoctor = await doctorModel.create({
      ...body,
      picture: fileName,
      author,
    });
    return newDoctor;
  }
}


module.exports = new DoctorService()