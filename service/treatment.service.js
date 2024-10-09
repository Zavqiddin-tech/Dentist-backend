const treatmentModel = require("../model/treatment.model");
const monitoringModel = require("../model/monitoring.model");

class TreatmentService {
  async getAll(req, res) {
    let query = { author: req.user.id };
    let deadline = new Date(req.query.date);
    console.log("deadline", deadline);
    if (deadline) {
      const startOfDay = new Date(deadline);
      startOfDay.setHours(0, 0, 0, 0); // kunning boshlanishi

      const endOfDay = new Date(deadline);
      endOfDay.setHours(23, 59, 59, 999); // kunning oxiri

      query.createdAt = {
        $gte: startOfDay, // tanlangan kunning boshlanishi
        $lte: endOfDay, // tanlangan kunning oxiri
      };
    }

    const populatedTreatment = await treatmentModel
      .find(query)
      .populate("doctorName") // faqat doctorName
      .populate("clientName") // faqat clientName
      .populate({
        path: "monitoringHistory", // monitoringHistory ma'lumotlarini yuklash
        model: "Monitoring",
      });

    return populatedTreatment;
  }

  async getFiltered(req, res) {
    const { treatmentType, clientType, deadline } = req.body;
    let query = { author: req.user.id };

    if (deadline) {
      const startOfDay = new Date(deadline);
      startOfDay.setHours(0, 0, 0, 0); // kunning boshlanishi

      const endOfDay = new Date(deadline);
      endOfDay.setHours(23, 59, 59, 999); // kunning oxiri

      query.createdAt = {
        $gte: startOfDay, // tanlangan kunning boshlanishi
        $lte: endOfDay, // tanlangan kunning oxiri
      };
    }

    if (treatmentType && treatmentType !== "hammasi") {
      query.category = treatmentType;
    }

    if (clientType && clientType === "qarzdor") {
      query.$expr = { $gt: ["$price", "$paid"] };
    }

    if (clientType && clientType === "tolangan") {
      query.$expr = { $eq: ["$price", "$paid"] };
    }

    const result = await treatmentModel
      .find(query)
      .populate("doctorName") // faqat doctorName
      .populate("clientName") // faqat clientName
      .populate({
        path: "monitoringHistory", // monitoringHistory ma'lumotlarini yuklash
        model: "Monitoring",
      });
    return result;
  }

  async create(body, author) {
    const monitoringHistory = [];

    if (body.paid && body.paid > 0 && body.price >= body.paid) {
      const newMonitoring = new monitoringModel({
        amount: body.paid,
      });
      monitoringHistory.push(newMonitoring);
    } else {
      throw new Error("To'lov muolaja narxidan kattaku !!!");
    }

    const newTreatment = await treatmentModel.create({
      ...body,
      author,
      monitoringHistory: monitoringHistory.map((item) => item._id),
    });

    // Agar monitoring yaratgan bo'lsak, saqlaymiz
    if (monitoringHistory.length) {
      await monitoringModel.insertMany(monitoringHistory);
    }

    const populatedTreatment = await treatmentModel
      .findById(newTreatment._id)
      .populate("doctorName") // faqat doctorName
      .populate("clientName") // faqat clientName
      .populate({
        path: "monitoringHistory", // monitoringHistory ma'lumotlarini yuklash
        model: "Monitoring",
      });

    console.log(populatedTreatment);
    return populatedTreatment;
  }

  async getOne(id) {
    const treatment = await treatmentModel
      .findById(id)
      .populate("doctorName")
      .populate("clientName")
      .populate({
        path: "monitoringHistory",
        model: "Monitoring",
      });

    return treatment;
  }

  async addPay(id, monitoringData) {
    // muolajani topish
    const treatment = await treatmentModel.findById(id).populate({
      path: "monitoringHistory",
      model: "Monitoring",
    });

    if (!treatment) {
      throw new Error("Muolaja topilmadi");
    }

    // Monitoring ma'lumotlarini yaratamiz
    const newMonitoring = new monitoringModel({
      amount: monitoringData.amount,
    });

    // Muolajaga yangi to'lovni qo'shamiz
    treatment.monitoringHistory.push(newMonitoring);

    // Yangi jami to'lov miqdorini hisoblaymiz
    const totalPaid = treatment.monitoringHistory.reduce((sum, monitoring) => {
      return sum + monitoring.amount;
    }, 0);

    // paid maydonini yangilaymiz
    if (!(treatment.price >= totalPaid)) {
      throw new Error("katta qiymat kiritildi");
    }
    treatment.paid = totalPaid;

    // saqlash
    await treatment.save();
    await newMonitoring.save();

   const result = await treatmentModel
      .findById(id)
      .populate("doctorName") // faqat doctorName
      .populate("clientName") // faqat clientName
      .populate({
        path: "monitoringHistory", // monitoringHistory ma'lumotlarini yuklash
        model: "Monitoring",
      });
    return result;
  }
}

module.exports = new TreatmentService();
