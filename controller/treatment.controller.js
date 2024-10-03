const treatmentService = require("../service/treatment.service");

class TreatmentController {
  async create(req, res, next) {
    try {
      const newTreatment = await treatmentService.create(req.body, req.user.id);
      res.status(201).json(newTreatment);
    } catch (error) {
      next(error);
    }
  }
  async addPay(req, res, next) {
    try {
      const newPay = await treatmentService.addPay(
        req.params.id,
        req.body.monitoringData
      );
      res.status(201).json(newPay);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TreatmentController();
