const treatmentService = require("../service/treatment.service");

class TreatmentController {

  async getAll(req, res, next) {
    try {
      const allTreatment = await treatmentService.getAll(req, res);
      res.status(200).json(allTreatment);
    } catch (error) {
      next(error);
    }
  }

  async getFiltered(req, res, next) {
    try {
      const allFiltered = await treatmentService.getFiltered(req, res)
      res.status(200).json(allFiltered)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const newTreatment = await treatmentService.create(req.body, req.user.id);
      res.status(201).json(newTreatment);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const treatment = await treatmentService.getOne(req.params.id);
      res.status(200).json(treatment);
    } catch (error) {
      next(error);
    }
  }

  async addPay(req, res, next) {
    try {
      const newPay = await treatmentService.addPay(
        req.params.id,
        req.body
      );
      res.status(201).json(newPay);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TreatmentController();
