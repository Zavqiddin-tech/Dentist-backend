const { Schema, model } = require("mongoose");

const treatmentSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    clientName: { type: Schema.ObjectId, ref: "Client" },
    doctorName: { type: Schema.ObjectId, ref: "Doctor" },
    monitoringHistory: [{ type: Schema.ObjectId, ref: "Monitoring" }],
    category: {
      type: String,
      enum: ["ortopediya", "terapiya"],
      required: true,
    },
    deadline: { type: Date },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    paid: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("Treatment", treatmentSchema);
