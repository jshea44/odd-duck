'use-strict'

let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + button');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


let clicks = 0;
let maxClicksAllowed = 25;

const products = [];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.timesClicked = 0;
  this.timesSeen = 0;
  products.push(this);
}

function getRandomNum() {
  return Math.floor(Math.random() * products.length);
}

function renderProducts() {
 
  let product1 = getRandomNum();
  let product2 = getRandomNum();
  let product3 = getRandomNum();

  
  image1.src = products[product1].src;
  image2.src = products[product2].src;
  image3.src = products[product3].src;

  image1.alt = products[product1].name;
  image2.alt = products[product2].name;
  image3.alt = products[product3].name;

  products[product1].views++;
  products[product2].views++;
  products[product3].views++;
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = event.target.alt;
  for (let i = 0; i < products.length; i++) {
    if (clickProduct === products[i].name) {
      products[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    productContainer.removeEventListener('click', handleProductClick);
    // give the button an event lister and styles so the user
    // knows its an active button:
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicks-allowed';
    productContainer.className = 'no-voting';
  } else {
    renderProducts();
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < products.length; i++) {
    let li = document.createElement('li')
    li.textContent = `${products[i].name} had ${products[i].views} views and was clicked ${products[i].clicks} times.`;
    ul.appendChild(li);
  }
}

let banana = new Product('Banana', './images/banana.jpg');
let bathroom = new Product('Bathroom', './images/bathroom.jpg');
let boots = new Product('Boots', './images/boots.jpg');
let breakfast = new Product('Breakfast', './images/breakfast.jpg');
let bubblegum = new Product('Bubblegum', './images/bubblegum.jpg');
let chair = new Product('Chair', './images/chair.jpg');
let cthulhu = new Product('Cthulhu', './images/cthulhu.jpg');
let dogDuck = new Product('Dog Duck', './images/dog-duck.jpg');
let dragon = new Product('Dragon', './images/dragon.jpg');
let pen = new Product('Pen', './images/pen.jpg');
let petSweep = new Product('Pet Sweep', './images/pet-sweep.jpg');
let scissors = new Product('Scissors', './images/scissors.jpg');
let shark = new Product('Shark', './images/shark.jpg');
let sweep = new Product('Sweep', './images/sweep.png');
let tauntaun = new Product('Tauntaun', './images/tauntaun.jpg');
let unicord = new Product('Unicorn', './images/unicorn.jpg');
let waterCan = new Product('Water Can', './images/water-can.jpg');
let wineGlass = new Product('Wine Glass', './images/wine-glass.jpg');



renderProducts();

productContainer.addEventListener('click', handleProductClick);