require("dotenv").config();
const config = require("./config/config");
const connectToDB = require("./db/db");
const app = require("./src/app");

const PORT = config.PORT || 5000;

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
