const doctorService = require("../service/doctor.service");

class DoctorController {
  async getAll(req, res, next) {
    try {
      const allDoctors = await doctorService.getAll(req, res);
      res.status(200).json(allDoctors);
    } catch (error) {
      next(error);
    }
  }

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

  async getOne(req, res, next) {
    try {
      const doctor = await doctorService.getOne(req.params.id);
      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const doctor = await doctorService.edit(body, params.id);
      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleteDoctor = await doctorService.delete(req.params.id);
      res.status(200).json(deleteDoctor);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new DoctorController();
