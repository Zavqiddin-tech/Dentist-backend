const { Schema, model } = require("mongoose");

const treatmentSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    clientName: { type: Schema.ObjectId, ref: "Client" },
    doctorName: { type: Schema.ObjectId, ref: "Doctor" },
    typesName: { type: Schema.ObjectId, ref: "Types" },
    monitoringHistory: [{ type: Schema.ObjectId, ref: "Monitoring" }],
    category: {
      type: String,
      enum: ["ortopediya", "terapiya"],
      required: true,
    },
    price: { type: Number, required: true },
    paid: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Treatment", treatmentSchema);
