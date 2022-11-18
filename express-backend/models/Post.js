const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  descriptiom: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String, required: true },
  dateCompleted: { type: String, required: true },
  complete: { type: Boolean, required: true },
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
