'use strict';

// Global variables
var imageSet = document.getElementById('imageset');
var imgLeft = document.getElementById('imgLeft');
var imgCenter = document.getElementById('imgCenter');
var imgRight = document.getElementById('imgRight');
var currentImageSet = [];
var lastImageSet = [];
var imagesArray = [];

// Constructor
function BusMallImage(name) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.timesSelected = 0;
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
function loadNewImageSet() {
  // get 3 random numbers to index the imagesArray with
  var random1, random2, random3;
  // assign each random variable a random number
  random1 = Math.floor(Math.random() * imagesArray.length);
  random2 = Math.floor(Math.random() * imagesArray.length);
  random3 = Math.floor(Math.random() * imagesArray.length);
  // check for duplicates and for repetition with previous image set
  checkForDuplicates(random1, random2, random3);

  
  // assign src
  imgLeft.src = imagesArray[Math.floor(Math.random() * imagesArray.length)].filepath;
  imgCenter.src = imagesArray[Math.floor(Math.random() * imagesArray.length)].filepath;
  imgRight.src = imagesArray[Math.floor(Math.random() * imagesArray.length)].filepath;
  // // assign title
  // imgLeft.title = goatArray[randomIndex].name;
  // // assign alt
  // imgLeft.alt = goatArray[randomIndex].name;
  // // increment time shown
  // goatArray[randomIndex].timesShown++;
}

function checkForDuplicates(num1, num2, num3) {
  // check for duplicate numbers within current image set
  if ((num1 === num2) || (num2 === num3)) {
    loadNewImageSet();
  }
  // if there are no duplicates in currrent image set then 
  // check for duplicate numbers between current and last image set
  
}

function handleImageSetClick(event) {
  this.timesSelected++;
}

loadNewImageSet();

imageSet.addEventListener('click', handleImageSetClick);

// Event handler
// function handleGoatClick(event){
//   if(event.target.alt === 'sassy-goat'){
//     alert('BAAAAAAAAAAAAAA I AM SASSY');
//   }
//   showARandomGoat();
// }

// Stuff that runs on page load
// Event listener
//goatpic.addEventListener('click', handleGoatClick);
// Show the first goat
//showARandomGoat();