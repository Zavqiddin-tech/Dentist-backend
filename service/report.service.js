const clientModel = require("../model/client.model");
const doctorModel = require("../model/doctor.model");
const treatmentModel = require("../model/treatment.model");

class ReportServeice {
  async getAll(req, res) {
    const allClientCount = await clientModel.countDocuments({
      author: req.user.id,
    });
    const allDoctorCount = await doctorModel.countDocuments({
      author: req.user.id,
    });
    const allTreatmentCount = await treatmentModel.countDocuments({
      author: req.user.id,
    });

    const allNotPaid = await treatmentModel.countDocuments({
      author: req.user.id,
      $expr: { $gt: ["$price", "$paid"] },
    });

    const allPaid = await treatmentModel.countDocuments({
      author: req.user.id,
      $expr: { $eq: ["$price", "$paid"] },
    });

    const allTreatment = await treatmentModel.find({ author: req.user.id });

    let price = 0;
    let paid = 0;

    const test = await allTreatment.forEach((item) => {
      (price += item.price), (paid += item.paid);
    });

    console.log(price, paid);

    let up =
      "fa-solid fa-caret-up txt-lg pr-2 text-green-500 group:text-green-500";
    let down = "fa-solid fa-caret-down txt-lg pr-2 text-red-500";

    const result = [
      {
        title: "Barcha mijozlar",
        count: allClientCount,
        icon: "fa-solid fa-square-poll-vertical",
      },
      {
        title: "Shifokorlar",
        count: allDoctorCount,
        icon: "fa-solid fa-user-doctor",
      },
      {
        title: "Jami muolajalar",
        count: allTreatmentCount,
        icon: "fa-solid fa-stethoscope",
				detail: price,
        detailIcon: 'fa-solid fa-money-bills pr-2 text-green-500 group:text-green-500',
        detailClass: '',
      },
      {
        title: "Qarzdor muolajalar",
        count: allNotPaid,
        icon: "fa-solid fa-circle-minus text-red-500",
        detail: price - paid,
        detailIcon: `${price - paid > paid ? up : down}`,
        detailClass: `${
          price - paid > paid ? "text-green-500" : "text-red-500"
        }`,
      },
      {
        title: "To'langan muolajalar",
        count: allPaid,
        icon: "fa-solid fa-money-bill-transfer text-green-500",
        detail: paid,
        detailIcon: `${price - paid <= paid ? up : down}`,
				detailClass: `${
          price - paid <= paid ? "text-green-500" : "text-red-500"
        }`,
      },
    ];

    return result;
  }
}

module.exports = new ReportServeice();
