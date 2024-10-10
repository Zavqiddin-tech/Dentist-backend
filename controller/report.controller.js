const reportService = require("../service/report.service");

class ReportController {
  async getAll(req, res, next) {
    try {
      const allPosts = await reportService.getAll(req, res);
      res.status(200).json(allPosts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
