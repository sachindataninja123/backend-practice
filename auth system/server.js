const config = require("./config/config");
const connectDb = require("./db/db");
const app = require("./src/app");
require("dotenv").config();

const PORT = config.PORT || 5000;

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
