const app = require("./app");
const environment = require("./config/environment");

app.listen(environment.port, () => {
  console.log(
    `Feedback API server is running on http://localhost:${environment.port}`
  );
});
