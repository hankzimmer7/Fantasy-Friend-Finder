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

    var newUserScores = req.body.scores;
    console.log(newUserScores);

    var compatabilityArray = [];

    for (var i = 0; i < friendData.length; i++) {
      var compatabilityScore = 0;
      for (var j = 0; j < newUserScores.length; j++) {
        compatabilityScore = compatabilityScore + Math.abs(friendData[i].scores[j] - parseFloat(newUserScores[j]));
        console.log("The type of compatability score is " + typeof (compatabilityScore));
      }
      compatabilityArray.push({
        name: friendData[i].name,
        compatability: compatabilityScore,
        photo: friendData[i].photo
      });
    }
    console.log(compatabilityArray);


    // Initially set the match to be the first user in the array
    var matchName = compatabilityArray[0].name;
    var matchCompatability = compatabilityArray[0].compatability;
    var matchIndex = 0;

    console.log("Match initialized at the first user, " + compatabilityArray[0].name + " who has a compatability score of " + compatabilityArray[0].compatability);

    // Go through the compatability array, and if a closer match is found, set that user as the match
    for (var i = 1; i < compatabilityArray.length; i++) {
      console.log("Checking against user " + compatabilityArray[i].name + " who has a compatability score of " + compatabilityArray[i].compatability);

      console.log("The comparison of " + compatabilityArray[i].compatability + " being less than " + matchCompatability + " is found to be " + (compatabilityArray[i].compatability < matchCompatability));
      if (compatabilityArray[i].compatability < matchCompatability) {
        matchName = compatabilityArray[i].name;
        matchCompatability = compatabilityArray[i].compatability;
        matchIndex = i;

        console.log("A better match was found. The new match is " + matchName + " with a compatability score of " + matchCompatability);
      }
    };

    console.log("The final match is " + matchName + " with a compatability score of " + matchCompatability + " and a match index of " + matchIndex);

    var matchObject = friendData[matchIndex];

    friendData.push(req.body);
    console.log("Added " + req.body.name + " to the API.")
    res.json(matchObject);
  });

  app.post("/api/reset", function () {
    // Reset the friend data back to the original set
    friendData = [{
        "name": "Cloud",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/3/32/Cloud_Portrait.jpg/revision/latest?cb=20080926214004",
        "scores": [
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
        "scores": [
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
        "scores": [
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
  });
};