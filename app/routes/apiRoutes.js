// ===============================================================================
// LOAD DATA
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        friendData.push(req.body);
        res.json(true);
    });


    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/reset", function () {
        // Empty out the arrays of data
        friendData = [
            {
              "name": "Cloud",
              "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/3/32/Cloud_Portrait.jpg/revision/latest?cb=20080926214004",
              "scores":[
                "2",
                "2",
                "4",
                "4",
                "5",
                "3",
                "2",
                "4",
                "4",
                "5"
              ]
            },
            {
              "name": "Tifa",
              "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/0/0a/Tifa_Portrait.jpg/revision/latest?cb=20130203034455",
              "scores":[
                "2",
                "4",
                "1",
                "5",
                "3",
                "5",
                "4",
                "3",
                "4",
                "5"
              ]
            },
            {
              "name": "Aeris",
              "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/e/e4/Aeris_Portrait.jpg/revision/latest?cb=20080926214002",
              "scores":[
                "5",
                "5",
                "4",
                "1",
                "2",
                "3",
                "4",
                "3",
                "2",
                "4"
              ]
            }
          ];

        console.log(friendData);
    });
};