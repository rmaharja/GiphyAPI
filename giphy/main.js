$(document).ready(function () {

  var reactionsArray = ["wtf", "wow", "nope", "see ya", "OMG", "hahaha", "mindblown"];

  function displayButtons() {

    // makes sure that the button does not repeat.
    $("#buttonSection").empty();
    //for loop to loop thru every giph

    for (var i = 0; i < reactionsArray.length; i++) {
      // Creating a variable that is a button
      var newButtons = $("<button>");
      // Adding class to the newGiphBtn for easier selection of buttons.
      newButtons.addClass("giphBtn");
      // Adding a data-attribute to add extra info
      newButtons.attr("data-reaction", reactionsArray[i]);
      // Add the text to the button based on the selected array.
      newButtons.text(reactionsArray[i]);
      $("#buttonSection").append(newButtons);


    }

  }

  //Creating new buttons
  $("#submitButton").on("click", function (event) {

      event.preventDefault();
      //Getting user input value from the textbox
      var reaction = $("#searchText").val().trim();
      console.log("submit:");
      console.log(reaction);
      //Getting the movies  based on the into reactionArray
      reactionArray.push(reaction);

      // Create new Buttons
      displayButtons();
    });
  

  function displayGiph() {
    var reaction = $(this).attr("data-reaction");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=cZi2yavHeMNM9vuaa4CGLRG6fYd9fNOj";
    // console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"

    })
      .then(function (response) {
        console.log(queryURL);
        console.log(response);

        $("#giphSection").empty() //clears previous giphs


        for (var i = 0; i < response.data.length; i++) {

          // Creating div/class so that the new giphs can go in it.
          var giphDiv = $("<div>").addClass("giphClass");

          //Retreiving Rating and adding it to a <p> tag
          var rated = response.data[i].rating;
          var pRating = $("<p>").text("Giph Rating:" + rated);
          giphDiv.append(pRating);

          //Retrieving Giph images (still, src and animated)
          var srcURL = response.data[i].images.fixed_height_still.url;
          var stillURL = response.data[i].images.fixed_height_still.url;
          var animatedURL = response.data[i].images.fixed_height.url;

          var giphImage = $("<img>").attr("src", srcURL);
          giphImage.addClass("giphImages");
          //Adding attr to the image and setting data state. 
          giphImage.attr("data-still", stillURL);
          giphImage.attr("data-animate", animatedURL);
          giphImage.attr("data-state", "still");
          //Adding the gif to the div
          giphDiv.append(giphImage);
          // Adding gifDiv to the HTML 
          $("#giphSection").append(giphDiv);
        }
      });
  }
  //Making function do some work (calling them)

  displayButtons();

  //On click functions
  // Display giphs when clicking the buttons
  $(document).on("click", ".giphBtn", displayGiph());

  //pausing and unpausing the images.
  $(document).on('click', '.giphImages', function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  });

  //Functionality Not Working



  // End of document.ready
});
