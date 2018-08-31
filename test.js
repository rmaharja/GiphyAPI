$( document ).ready(function() {
  // alert("ready")

//Variables=================================================================================
//Array of categories

var reactionsArray= [ "wtf", "wow", "nope", "see ya", "OMG", "hahaha", "mindblown",]
//FUNctions=================================================================================

function displayGiph(){

  var reaction= $(this).attr("data-reaction");

//Make a quryURL using the giph;

var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ reaction + "&api_key=dc6zaTOxFJmzC&limit=10&offset=10";

//Perform ajax call
$.ajax({
  url: queryURL,
  method: "GET"
})
//After Data comes back grom the request, do this:
.then (function(response){

// Shows URL that is created
  console.log("queryURL:");
  console.log(queryURL);
// Shows the object from the specific search
// console.log("response:");
//   console.log(response);

// Createing a div to hold the giphs
// var giphDiv= $('<div class = "giphCLass">');
// console.log("giphDiv:");
// console.log(giphDiv);

// Store the results from AJax in a variable
  // console.log ("response.data:");
  // console.log(response.data);

  
  // Could set giphResults= response.data, and use giphResults for future values of response.data.
  // Creating rating variable
  for (var i = 0; i<response.data.length; i++){
    var giphDiv= $('<div class = "giphCLass">');

  var Rated= response.data[i].rating;
  // console.log("Rating:")
  // console.log(Rated);


  // Creating element to display the rating
 var pRating= $("<p>").text("Giph Rating:"+ Rated);

  // console.log(pRating);
  // Display the rating into DOM
  giphDiv.append(pRating);

  // Retrieve/Add  the actual giphs (src, still and animated)

  //Retrieving the images for giph
  // console.log(reactionsArray);
  var srcURL= response.data[i].images.fixed_height_still.url;
  
  console.log("srcURL:")
  console.log(srcURL);
  var stillURL= response.data[i].images.fixed_height_still.url;
  var animatedURL= response.data[i].images.fixed_height.url;

  // add attributes into the image tag
  var giphImage= $("<img>").attr("src", srcURL);

  // Create attr for image
  giphImage.attr("data-still", stillURL );
  giphImage.attr("data-animated", animatedURL );
  giphImage.attr("data-state", "still");

  // append the image to giphDiv
  giphDiv.append(giphImage);

  //Prepend tp giphSection (from HTML)

  $("#giphSEction").append(giphDiv);
 }
 $(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});


// Function creates new buttons.
function createButton (){

  // makes sure that the button does not repeat.
  // $("#buttonSection").empty();
  //for loop to loop thru every giph

  for (var i=0; i< reactionsArray.length; i++){
    // Creating a variable that is a button
    var newButtons= $("<button>");
    // Adding class to the newGiphBtn for easier selection of buttons.
    newButtons.addClass("newGiphBtn");
    // Adding a data-attribute to add extra info
    newButtons.attr("data-reaction", reactionsArray[i]);
    // Add the text to the button based on the selected array.
    newButtons.text(reactionsArray[i]);
    $("#buttonSection").append(newButtons);


  }

}

function newButtons(){
$("#submitButton").on("click", function (event){

  event.preventDefault();
//Getting user input value from the textbox
  var reaction= $("#searchText").val().trim();
  // console.log(reaction);
//Getting the movies  based on the into reactionArray
  reactionArray.push(reaction);
  
  // Create new Buttons
  createButton();
});
}

});
// $(document).on("click", ".newGiphBtn", displayGiph);
createButton();
// displayGiph()
// $("button").on("click", function() {
//   displayGipH();
// }asdfasdfasdf




 
//Main Processes============================================================================


// 1. Create List of arrays and display them as buttons
// 2. When buttons are clicked, a list of Giphs will show
// 3.  The lists of giphs will have a Rating appended to them
// 4.  When the giphs are clicked the giphs will turn from still to animated
//5.  When the giphs are clicked while animated, it will turn still
//6. Search and add buttons when they are clicked.
//7.


















