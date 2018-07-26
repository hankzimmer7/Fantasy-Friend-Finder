// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Creates express server
var app = express();

// Sets initial port
var PORT = process.env.PORT || 1337;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// Points the server to the routing files
// ================================================================================

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function () {
    console.log("Friend Finder app listening at http://localhost:" + PORT);
});