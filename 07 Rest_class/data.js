const { v4 : uuidv4 } = require("uuid");
uuidv4();

let posts = [
  {
    id: uuidv4(),
    username: "sachin",
    content: "Just completed my first EJS project! 🚀",
  },
  {
    id: uuidv4(),
    username: "john_doe",
    content: "Learning Express.js routing is actually fun.",
  },
  {
    id: uuidv4(),
    username: "emma",
    content: "MongoDB + Express + EJS is a great combination.",
  },
  {
    id: uuidv4(),
    username: "alex",
    content: "Working on my GitHub portfolio today.",
  },
  {
    id: uuidv4(),
    username: "olivia",
    content: "Finally understood how template engines work.",
  },
  {
    id: uuidv4(),
    username: "david",
    content: "Node.js makes backend development so much easier.",
  },
  {
    id: uuidv4(),
    username: "sophia",
    content: "Built my first dynamic profile page using EJS.",
  },
  {
    id: uuidv4(),
    username: "liam",
    content: "Practicing REST APIs with Express every day.",
  },
  {
    id: uuidv4(),
    username: "isabella",
    content: "Small projects every day lead to big improvements.",
  },
  {
    id: uuidv4(),
    username: "noah",
    content: "Excited to start learning authentication next!",
  },
];

module.exports = posts;
