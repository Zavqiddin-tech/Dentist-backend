const doctorService = require("../service/doctor.service");

class DoctorController {
  async create(req, res, next) {
    try {
      const newDoctor = await doctorService.create(
        req.body,
        req.files.picture,
        req.user.id
      );
      res.status(201).json(newDoctor);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoctorController();
