// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // HTML GET Requests
  // ---------------------------------------------------------------------------

  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/css/style.css", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/css/style.css"));
  });

  app.get("/images/chocobo.png", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/chocobo.png"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};