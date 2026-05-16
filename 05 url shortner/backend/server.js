import config from "./config/config.js";
import connectToDB from "./db/db.js";
import app from "./src/app.js";

const PORT = config.PORT;

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
