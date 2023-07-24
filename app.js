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

  while (product1 === product2 || product1 === product3) {
    product1.getRandomNum();
  }
  while (product2 === product3) {
    product2.getRandomNum();
  }

  
  image1.src = products[product1].src;
  image2.src = products[product2].src;
  image3.src = products[product3].src;

  image1.alt = products[product1].name;
  image2.alt = products[product2].name;
  image3.alt = products[product3].name;

  products[product1].timesSeen++;
  products[product2].timesSeen++;
  products[product3].timesSeen++;
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = event.target.alt;
  for (let i = 0; i < products.length; i++) {
    if (clickProduct === products[i].name) {
      products[i].timesClicked++;
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
    li.textContent = `${products[i].name} had ${products[i].timesSeen} views and was clicked ${products[i].timesClicked} times.`;
    ul.appendChild(li);
  }
}

let banana = new Product('banana', './images/banana.jpg');
let bathroom = new Product('bathroom', './images/bathroom.jpg');
let boots = new Product('boots', './images/boots.jpg');
let breakfast = new Product('breakfast', './images/breakfast.jpg');
let bubblegum = new Product('bubblegum', './images/bubblegum.jpg');
let chair = new Product('chair', './images/chair.jpg');
let cthulhu = new Product('cthulhu', './images/cthulhu.jpg');
let dogDuck = new Product('dog-duck', './images/dog-duck.jpg');
let dragon = new Product('dragon', './images/dragon.jpg');
let pen = new Product('pen', './images/pen.jpg');
let petSweep = new Product('pet-sweep', './images/pet-sweep.jpg');
let scissors = new Product('scissors', './images/scissors.jpg');
let shark = new Product('shark', './images/shark.jpg');
let sweep = new Product('sweep', './images/sweep.png');
let tauntaun = new Product('tauntaun', './images/tauntaun.jpg');
let unicord = new Product('unicorn', './images/unicorn.jpg');
let waterCan = new Product('water-can', './images/water-can.jpg');
let wineGlass = new Product('wine-glass', './images/wine-glass.jpg');



renderProducts();

productContainer.addEventListener('click', handleProductClick);
