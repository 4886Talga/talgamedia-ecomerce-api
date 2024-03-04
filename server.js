const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3001;
const server = http.createServer(app);

app.listen(port, () => {
  console.log("Server running on port 3001");
});
