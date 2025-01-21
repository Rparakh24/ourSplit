const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(
  "mongodb+srv://ronitparakh24:db%40ronit12@cluster0.sjjklvg.mongodb.net/ourSplit"
);

const userSchema = new Schema({
  username: String,
  fname: String,
  lname: String,
  pswd: String,
  groups: [{ type: mongoose.Schema.ObjectId, ref: "Group" }],
});

const groupSchema = new Schema({
  name: String,
  members: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: "User" }, // Link to original user
      gets: [
        {
          userId: { type: mongoose.Schema.ObjectId, ref: "User" },
          amount: { type: Number, required: true },
        },
      ],
      owed: [
        {
          userId: { type: mongoose.Schema.ObjectId, ref: "User" },
          amount: { type: Number, required: true },
        },
      ],
    },
  ],
});

const expenseSchema = new Schema({
  desc: String,
  amount: Number,
  groupId: {type:mongoose.Schema.ObjectId,ref:"Group"},
  participants: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      amount: Number,
    },
  ],
  paidBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
  
});

const User = mongoose.model("User", userSchema);
const Group = mongoose.model("Group", groupSchema);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {
  User,
  Group,
  Expense,
};
