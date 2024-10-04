const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Client", clientSchema);
