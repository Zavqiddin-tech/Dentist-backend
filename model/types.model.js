const { Schema, model } = require("mongoose");

const typesSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Types", typesSchema);
