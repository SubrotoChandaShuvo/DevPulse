import app from "./app";
import config from "./config";

const port = config.port;

const main = () => {
    app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
}

main();