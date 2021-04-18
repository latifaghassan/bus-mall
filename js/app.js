"use strict";
 
let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let counts = 0;
let maxAttempts = 25;

let leftIndex;
let middleIndex;  
let rightIndex;

function Products(name,source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shownTime = 0;
    Products.allImages.push(this);
  }

  Products.allImages =[];
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


function render() {
    leftIndex = genrateRandomIndex();
    middleIndex = genrateRandomIndex();  
    rightIndex = genrateRandomIndex();

    while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex){
        leftIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();
        while(rightIndex = genrateRandomIndex){
            middleIndex = genrateRandomIndex();
        }
      
    }

    leftImageElement.src = Products.allImages[leftIndex].source;
    Products.allImages[leftIndex].shownTime++;
    middleImageElement.src = Products.allImages[middleIndex].source;
    Products.allImages[middleIndex].shownTime++;
    rightImageElement.src = Products.allImages[rightIndex].source;
    Products.allImages[rightIndex].shownTime++;

}
render();


leftImageElement.addEventListener('click', handleClicking);
middleImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);

function handelClicking(event){
    counts++;
    if (maxAttempts >= counts) {

        if(event.target.id === 'left-image'){
            Products.allImages[leftIndex].votes++;

        }else if(event.target.id === 'middle-image'){
            Products.allImages[middleIndex].votes++;

        }else if(event.target.id === 'right-image'){
            Products.allImages[rightIndex].votes++;
        } 
        
        render();

        console.log(Products.allImages);

        }else {
        renderList()

        leftImageElement.removeEventListener('click', handelClicking);
        middleImageElement.removeEventListener('click', handelClicking);
        rightImageElement.removeEventListener('click', handelClicking);
    }
}

       
        function renderList(){
        let ul = document.getElementById('lists');
        for(let i = 0 ; i < Products.allImages.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${Products.allImages[i].name} had ${Products.allImages[i].votes} Votes and was seen for ${Products.allImages[i].shownTime } times`;
     }
  }
  console.log(Products.allImages);

        function genrateRandomIndex(){
        return Math.floor(Math.random() * Products.allImages.length); 
                  
 }


 //console.log(genrateRandomIndex());