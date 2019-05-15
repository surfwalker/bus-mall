'use strict';

// Global variables
var displayResults = document.getElementById('display-results');
var imageSet = document.getElementById('imageset');
var imgLeft = document.getElementById('imgLeft');
var imgCenter = document.getElementById('imgCenter');
var imgRight = document.getElementById('imgRight');
var drawChartButton = document.getElementById('draw-chart');
var imagesArray = [];
var randomIndexArray = [];
var votesRemaining = 25;
var chartDrawn = false;
var chartVotesArray = [];
var chartImageNamesArray = [];
var busMallChart;

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

function updateChartArrays() {
  for (var i = 0; i < imagesArray.length; i++) {
    chartVotesArray[i] = imagesArray[i].votes;
    chartImageNamesArray[i] = imagesArray[i].name;
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
    imageSet.removeEventListener('click', handleImageSetClick);
    updateChartArrays();
    drawChartButton.style.visibility = 'visible';
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

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.7.2
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: chartImageNamesArray, // image names array we declared earlier
  datasets: [{
    label: '',
    data: chartVotesArray, // votes array we declared earlier
    backgroundColor: [
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy',
      'red',
      'gold',
      'orange',
      'green',
      'yellow',
      'black',
      'brown',
      'pink',
      'blue',
      'lilac',
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy'
    ],
    hoverBackgroundColor: [
      'purple',
      'purple',
      'purple',
      'purple',
      'purple'
    ]
  }]
};

function drawChart() {
  var ctx = document.getElementById('busmall-chart').getContext('2d');
  busMallChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Bus Mall Survey Results'
    },
      responsive: false,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}

// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++

drawChartButton.addEventListener('click', function() {
  drawChart();
  console.log('chart was drawn');
});

// document.getElementById('list-button').addEventListener('click', function() {
//   showSongsAsList();
// });

// document.getElementById('list-button').addEventListener('click', showSongsAsList);

// document.getElementById('funky-list').addEventListener('click', function() {
//   document.getElementById('funky-list').hidden = true;
// });

// document.getElementById('voting').addEventListener('click', function(event) {
//   if (event.target.id !== 'voting') {
//     tallyVote(event.target.id);
//   };

//   if (chartDrawn) {
//     songChart.update();
//   }
// });

imageSet.addEventListener('click', handleImageSetClick);
loadNewImageSet(imgLeft);
loadNewImageSet(imgCenter);
loadNewImageSet(imgRight);
