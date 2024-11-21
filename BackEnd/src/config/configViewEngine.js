var path = require("path");
const configView = (app) => {
  const __dirname = "src";
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  app.set("public", path.join(__dirname, "public"));
};

module.exports = configView;
