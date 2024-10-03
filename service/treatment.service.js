const treatmentModel = require("../model/treatment.model");
const monitoringModel = require("../model/monitoring.model");

class TreatmentService {
  async create(body, author) {
    const newTreatment = await treatmentModel.create({
      ...body,
      author,
    });
    return newTreatment;
  }

  async addPay(id, monitoringData) {
    // muolajani topish
    const treatment = await treatmentModel.findById(id);

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
    treatment.paid = totalPaid;

    // saqlash
    await treatment.save();
    await newMonitoring.save();

    return treatment;
  }
}

module.exports = new TreatmentService();
