const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

//Export model
module.exports = mongoose.model("User", UserSchema);
