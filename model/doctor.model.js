const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    picture: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Doctor", doctorSchema);
