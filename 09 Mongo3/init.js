const mongoose = require("mongoose");
const Chat = require("./models/chat.model");

main()
  .then((res) => {
    console.log("connection successfull!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "Neha",
    to: "Priya",
    message: "Send me your exam sheets",
    created_at: new Date(),
  },
  {
    from: "shyam",
    to: "mohan",
    message: "Send me your email id",
    created_at: new Date(),
  },
  {
    from: "omkar",
    to: "omkar",
    message: "Send me your omkar sheets",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "neha",
    message: "Send me your exam sheets",
    created_at: new Date(),
  },
  {
    from: "piyush",
    to: "pooja",
    message: "what about your exam sheets",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)


