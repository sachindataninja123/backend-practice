require("dotenv").config();
const connectToDB = require("./db/db");
const app = require("./src/app");

const PORT = process.env.PORT;
connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
