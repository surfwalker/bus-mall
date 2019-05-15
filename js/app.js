'use strict';

// Global variables
var displayResults = document.getElementById('display-results');
var imageSet = document.getElementById('imageset');
var imgLeft = document.getElementById('imgLeft');
var imgCenter = document.getElementById('imgCenter');
var imgRight = document.getElementById('imgRight');
var imagesArray = [];
var randomIndexArray = [];
var votesRemaining = 25;

// Constructor
function BusMallImage(name) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.votes = 0;
  imagesArray.push(this);
}

// Instances
new BusMallImage('bag');
new BusMallImage('banana');
new BusMallImage('bathroom');
new BusMallImage('boots');
new BusMallImage('breakfast');
new BusMallImage('bubblegum');
new BusMallImage('chair');
new BusMallImage('cthulhu');
new BusMallImage('dog-duck');
new BusMallImage('dragon');
new BusMallImage('pen');
new BusMallImage('pet-sweep');
new BusMallImage('scissors');
new BusMallImage('shark');
new BusMallImage('sweep');
new BusMallImage('tauntaun');
new BusMallImage('unicorn');
new BusMallImage('usb');
new BusMallImage('water-can');
new BusMallImage('wine-glass');

// Load new set of three seperate images
function loadNewImageSet(imageElement) {
  // get a random number with which to index the imagesArray with
  var randomIndex = Math.floor(Math.random() * imagesArray.length);
  console.log('randomIndex is :', randomIndex);

  // check for duplicates and for repetition with previous image set
  while (randomIndexArray.includes(randomIndex)) {
    console.log('Hello from inside while loop with randomIndex: ', randomIndex);
    // if randomIndex already exists in randomIndexArray then assign another random number
    randomIndex = Math.floor(Math.random() * imagesArray.length);
  }
  // add randomIndex to the start of randomIndexArray
  randomIndexArray.unshift(randomIndex);

  // assign src
  imageElement.src = imagesArray[randomIndex].filepath;

  // assign title
  imageElement.title = imagesArray[randomIndex].name;

  // assign alt
  imageElement.alt = imagesArray[randomIndex].name;

  // increment time shown
  imagesArray[randomIndex].timesShown++;

  while(randomIndexArray.length > 6) {
    randomIndexArray.pop();
  }
}

function renderResults() {
  console.log(displayResults);
  for (var i = 0; i < imagesArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${imagesArray[i].name} was shown ${imagesArray[i].timesShown} times and received ${imagesArray[i].votes} votes`;
    displayResults.appendChild(liEl);
  }
}

function handleImageSetClick(event) {

  votesRemaining--;

  if(votesRemaining === 0) {
    renderResults();
    imageSet.removeEventListener('click', handleImageSetClick);
    alert("That's the end of this survey. Please scroll down for the results.");
  }

  var imageName = event.target.title;
  console.log('My event target title is ', event.target.title);

  for (var i = 0; i < imagesArray.length; i++) {
    if(imagesArray[i].name === imageName) {
      imagesArray[i].votes++;
    }
  }

  loadNewImageSet(imgLeft);
  loadNewImageSet(imgCenter);
  loadNewImageSet(imgRight);
}

imageSet.addEventListener('click', handleImageSetClick);
loadNewImageSet(imgLeft);
loadNewImageSet(imgCenter);
loadNewImageSet(imgRight);
