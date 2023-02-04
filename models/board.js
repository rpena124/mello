const { Schema, model } = require("mongoose");
const List = require("../models/list");

const boardSchema = new Schema(
  {
    title: String,
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
        autopopulate: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.plugin(require("mongoose-autopopulate"));
const Board = model("Board", boardSchema);

module.exports = Board;
