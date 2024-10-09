const { Schema, model } = require("mongoose");

const monitoringSchema = new Schema(
  {
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Monitoring", monitoringSchema);
