// The image we want to classify
var img = document.querySelector("img");
// we create an Image Classifier using the "MobileNet" model
var classifier = ml5.imageClassifier("MobileNet", makePrediction);

// the makePrediction is used to call the "predict" method of our classifier on our image
// then call the displayResults function
function makePrediction() {
  classifier.predict(img, displayResults);
}

function displayResults(error, results) {
  // "results" is an array with a default of 10 options with their probabilities
  // we store the 1st element, the one with the highest probability
  var bestResult = results[0];
  var classification = bestResult.className;
  var probability = bestResult.probability.toFixed(4) * 100 + "%";

  // we display the result in our
  document.querySelector("#result").innerText =
    "MobileNet is " + probability + " sure this is a " + classification;
}

// add drag'n drop interaction with p5js
function setup() {
  var dropzone = select("#dropzone");
  dropzone.drop(function(file) {
    img.src = file.data;
    makePrediction();
  });
}