const { Schema, model } = require("mongoose");
const Card = require("../models/card");

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    card: [{ type: Schema.Types.ObjectId, ref: "Card", autopopulate: true }],
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
listSchema.plugin(require("mongoose-autopopulate"));
const List = model("List", listSchema);

module.exports = List;
