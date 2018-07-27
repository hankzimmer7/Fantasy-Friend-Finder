// ===============================================================================
// LOAD DATA
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    var newUserScores = req.body.scores;
    console.log(newUserScores);

    var compatabilityArray = [];

    for (var i = 0; i < friendData.length; i++) {
      var compatabilityScore = 0;
      for (var j = 0; j < newUserScores.length; j++) {
        compatabilityScore = compatabilityScore + Math.abs(friendData[i].scores[j] - parseFloat(newUserScores[j]));
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

    console.log("Match initialized at the first user, " + compatabilityArray[0].name + ", who has a compatability score of " + compatabilityArray[0].compatability);

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
          "1",
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
          "3",
          "1",
          "3",
          "5",
          "3",
          "2",
          "1",
          "2",
          "2",
          "1"
        ]
      },
      {
        "name": "Barret",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/a/ac/Barret_PortraitNB.png/revision/latest?cb=20130203032221",
        "scores":[
          "1",
          "1",
          "3",
          "5",
          "4",
          "4",
          "1",
          "2",
          "3",
          "1"
        ]
      },
      {
        "name": "Cait Sith",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/6/65/CaitSith-FFVIIArt.png/revision/latest?cb=20110227161509",
        "scores":[
          "3",
          "2",
          "3",
          "5",
          "1",
          "4",
          "1",
          "2",
          "3",
          "5"
        ]
      },
      {
        "name": "Yuffie",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/7/7a/Yuffie_Portrait.jpg/revision/latest?cb=20130203034936",
        "scores":[
          "1",
          "1",
          "4",
          "5",
          "4",
          "2",
          "2",
          "2",
          "3",
          "5"
        ]
      },
      {
        "name": "Vincent",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/8/81/Vincent_Portrait.jpg/revision/latest?cb=20130203034546",
        "scores":[
          "3",
          "1",
          "4",
          "2",
          "1",
          "2",
          "2",
          "1",
          "5",
          "5"
        ]
      },
      {
        "name": "Red XIII",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy2/images/8/8e/RedXIII_Portrait_FFVII.jpg/revision/latest?cb=20090424170007&path-prefix=de",
        "scores":[
          "2",
          "1",
          "4",
          "2",
          "1",
          "1",
          "2",
          "4",
          "5",
          "2"
        ]
      },
      {
        "name": "Sephiroth",
        "photo": "https://vignette.wikia.nocookie.net/finalfantasy/images/4/4c/Sephiroth_Portrait.jpg/revision/latest?cb=20130203034009",
        "scores":[
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1",
          "1"
        ]
      }
    ];
  });
};