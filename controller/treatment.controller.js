const treatmentService = require("../service/treatment.service");

class TreatmentController {
  async create(req, res, next) {
    try {
      const newTreatment = await treatmentService.create(
        req.body,
        req.user.id
      );
      res.status(201).json(newTreatment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TreatmentController();
