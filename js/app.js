"use strict";


let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let container = document.getElementById('sec-one');

let counts = 0;
let maxAttempts = 25;

let leftIndex;
let middleIndex;
let rightIndex;
let arrayOfNames = [];
let arrayOfVotes = [];

function Products(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shownTime = 0;
    Products.allImages.push(this);
    arrayOfNames.push(this.name);
    arrayOfVotes.push(this.votes);
}

//console.log(arrayOfNames);
//console.log(arrayOfNames);

Products.allImages = [];
//console.log(Products.allImages);

new Products('bag', 'img/bag.jpg');//[0]
new Products('banana', 'img/banana.jpg');//[1]
new Products('bathroom', 'img/bathroom.jpg');//[2]
new Products('boots', 'img/boots.jpg');//[3]
new Products('breakfast', 'img/breakfast.jpg');//[4]
new Products('bubblegum', 'img/bubblegum.jpg');//[5]
new Products('chair', 'img/chair.jpg')//[6]
new Products('cthulhu', 'img/cthulhu.jpg');//[7]
new Products('dog-duck', 'img/dog-duck.jpg');//[8]
new Products('dragon', 'img/dragon.jpg');//[9]
new Products('pen', 'img/pen.jpg');//[10]
new Products('pet-sweep', 'img/pet-sweep.jpg');//[11]
new Products('scissors', 'img/scissors.jpg');//[12]
new Products('shark', 'img/shark.jpg')//[13]
new Products('sweep', 'img/sweep.png');//[14]
new Products('tauntaun', 'img/tauntaun.jpg');//[15]
new Products('unicorn', 'img/unicorn.jpg');//[16]
new Products('usb', 'img/usb.gif');//[17]
new Products('water-can', 'img/water-can.jpg');//[18]
new Products('wine-glass', 'img/wine-glass.jpg');//[19]


/************************LAB12******************************/
//console.log(Products.allImages);
//console.log(genrateRandomIndex());

// for displaying the images
let previouslyShown = []; 
function checking(idx, arr){
    for(let i = 0 ; i <arr.length; i++){
        if(idx === arr[i]){
            return true
        }
      } return false;
}

/************************LAB13******************************/

function saveDataToLs(){
    //console.log(Products.allImages);
    //console.log(JSON.stringify(Products.allImages));
    let arrStr = JSON.stringify(Products.allImages);
    localStorage.setItem('dataList', arrStr);
    // JSON - javascript object notation
}

function gettingDataFromLs(){
    // getting the item from the LS and it should have a key
    let data = localStorage.getItem('dataList');
    //console.log(data);
    // converting from JSON Format to normal Arr of object
    let item = JSON.parse(data);
   // console.log(item);
    if(item !== null){
    Products.allImages = item;
   // render();

   }
}
/************************LAB13******************************/

render();

function render(){
        console.log('Before', previouslyShown);
        leftIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();

    // left === right OR left === middle OR right === middle
    // avoid repeated ones and make sure they differs.
        while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex || previouslyShown.includes(leftIndex) || previouslyShown.includes(middleIndex) || checking(rightIndex,previouslyShown)){
        rightIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();
        leftIndex = genrateRandomIndex();
    };

    // 3 different values
    // replace the values each time we run the function
    previouslyShown = [leftIndex,middleIndex,rightIndex];
    //console.log('After', previouslyShown)

/************************LAB12******************************/


    leftImageElement.src = Products.allImages[leftIndex].source;
    Products.allImages[leftIndex].shownTime++;
    middleImageElement.src = Products.allImages[middleIndex].source;
    Products.allImages[middleIndex].shownTime++;
    rightImageElement.src = Products.allImages[rightIndex].source;
    Products.allImages[rightIndex].shownTime++;

}


//leftImageElement.addEventListener('click', handleClicking);
//middleImageElement.addEventListener('click', handleClicking);
//rightImageElement.addEventListener('click', handleClicking);

container.addEventListener('click', handleClicking);

function handleClicking(event) {
    // console.log(event.target.id);
    counts++;
    // console.log(counts);
    if (maxAttempts >= counts) {

        if (event.target.id === 'left-image') {
            Products.allImages[leftIndex].votes++;

        } else if (event.target.id === 'middle-image') {
            Products.allImages[middleIndex].votes++;

        } else if (event.target.id === 'right-image') {
            Products.allImages[rightIndex].votes++;
        } else {
            alert('you should click on the images');
            counts--;
        }

        render();
        //console.log(Products.allImages);

    } else {
        renderList();
        chart()
        container.removeEventListener('click', handleClicking);

        //lab13
        saveDataToLs();


        //leftImageElement.removeEventListener('click', handelClicking);
        //middleImageElement.removeEventListener('click', handelClicking);
        //rightImageElement.removeEventListener('click', handelClicking);
    }
}
//  BUTTON // 
let button = document.getElementById('btn');
button.addEventListener('click', showingList);

function showingList(){

button.removeEventListener('click',showingList);

}


let arrayOfVotess = [];
let arrayofshownTime = [];
function renderList(){
    let ul = document.getElementById('lists');
    for (let i = 0; i < Products.allImages.length; i++) {
        arrayOfVotess.push(Products.allImages[i].votes);
        arrayofshownTime.push(Products.allImages[i].shownTime);
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Products.allImages[i].name} had ${Products.allImages[i].votes} Votes and it was seen for ${Products.allImages[i].shownTime} times`;
    }
    console.log( arrayOfVotess);
    console.log( arrayofshownTime);
}
function genrateRandomIndex(){
    return Math.floor(Math.random() * Products.allImages.length);
}


//console.log(arrayOfVotes);
//console.log(arrayOfVotes);
//renderList();

/************************LAB12******************************/

    function chart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, { // instance
        type: 'bar',
        data: {
            labels: arrayOfNames,
            datasets: [{
                label: 'Number of Votes',
                data: arrayOfVotess,
                backgroundColor: 
                    'rgba(191, 63, 63, 0.7)',
                
                borderWidth: 1
            }, {
                label: 'Times of Shown',
                data: arrayofshownTime,
                backgroundColor: 
                    'rgba(63, 191, 63, 0.7)',
                    
                    borderWidth: 1

                }]

            },
   });
}
/************************LAB12******************************/
  //lab13
  gettingDataFromLs();
