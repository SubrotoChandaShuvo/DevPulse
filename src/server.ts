import app from "./app.js";
import config from "./config";
import { initDB } from "./db";

const port = config.port;
console.log(port);

const main = () => {
  initDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

main();
