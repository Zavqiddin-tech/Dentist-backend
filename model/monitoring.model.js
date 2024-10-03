const { Schema, model } = require("mongoose");

const monitoringSchema = new Schema(
  {
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exportts = model("Monitoring", monitoringSchema);
