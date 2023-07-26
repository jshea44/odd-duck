'use-strict';

let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + button');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let chartCanvas = document.getElementById('myChart');


let clicks = 0;
let maxClicksAllowed = 5;
let lastImages = [];
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

  

  
  while ((product1 === product2 || product1 === product3)) {
    product1 = getRandomNum();
  }
  while ((product2 === product3 || product2 === product1)) {
    product2 = getRandomNum();
  }
 
  // if (lastImages < 3) {
  //   while (lastImages.includes(product1)) {
  //     product1 = getRandomNum();
  //   }
  //   while(lastImages.includes(product2) || product2 === product1) {
  //     product2 = getRandomNum();
  //   }
  //   while (lastImages.includes(product3) || product3 === product1 || product3 === product2) {
  //     product3 = getRandomNum();
  //   }
  // }

  // lastImages[0] = product1;
  // lastImages[1] = product2;
  // lastImages[2] = product3;

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
      save();
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    productContainer.removeEventListener('click', handleProductClick);
  } else {
    renderProducts();
  }
}

// function renderResults() {
//   // let ul = document.querySelector('ul');
//   for (let i = 0; i < products.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${products[i].name} had ${products[i].timesSeen} views and was clicked ${products[i].timesClicked} times.`;
//     // ul.appendChild(li);
//   }
// }

let chartObj = null;
resultButton.addEventListener('click', function() {
  chartObj = renderChart();
  // chartObj.data.datasets[0].data[0] = 10;
  console.log(chartObj);
  chartObj.update();
});

function renderChart() {
  let productNames = [];
  let productLikes = [];
  let productViews = [];

  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].name);
    productLikes.push(products[i].timesClicked);
    productViews.push(products[i].timesSeen);
  }

  return new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        borderWidth: 1
      }, {
        label: 'Likes',
        data: productLikes,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


new Product('banana', './images/banana.jpg'),
new Product('bathroom', './images/bathroom.jpg'),
new Product('boots', './images/boots.jpg'),
new Product('breakfast', './images/breakfast.jpg'),
new Product('bubblegum', './images/bubblegum.jpg'),
new Product('chair', './images/chair.jpg'),
new Product('cthulhu', './images/cthulhu.jpg'),
new Product('dog-duck', './images/dog-duck.jpg'),
new Product('dragon', './images/dragon.jpg'),
new Product('pen', './images/pen.jpg'),
new Product('pet-sweep', './images/pet-sweep.jpg'),
new Product('scissors', './images/scissors.jpg'),
new Product('shark', './images/shark.jpg'),
new Product('sweep', './images/sweep.png'),
new Product('tauntaun', './images/tauntaun.jpg'),
new Product('unicorn', './images/unicorn.jpg'),
new Product('water-can', './images/water-can.jpg'),
new Product('wine-glass', './images/wine-glass.jpg'),



renderProducts();

productContainer.addEventListener('click', handleProductClick);


// Data saving / loading functionality

function save() {
  let valuesToStore = JSON.stringify(products);
  localStorage.setItem('chartData', valuesToStore);
}

// function load() {
//   let rawData = localStorage.getItem('chartData');
//   let chartObject = JSON.parse(rawData);
//   if (!chartObject) { [
//     new Product('banana', './images/banana.jpg'),
//     new Product('bathroom', './images/bathroom.jpg'),
//     new Product('boots', './images/boots.jpg'),
//     new Product('breakfast', './images/breakfast.jpg'),
//     new Product('bubblegum', './images/bubblegum.jpg'),
//     new Product('chair', './images/chair.jpg'),
//     new Product('cthulhu', './images/cthulhu.jpg'),
//     new Product('dog-duck', './images/dog-duck.jpg'),
//     new Product('dragon', './images/dragon.jpg'),
//     new Product('pen', './images/pen.jpg'),
//     new Product('pet-sweep', './images/pet-sweep.jpg'),
//     new Product('scissors', './images/scissors.jpg'),
//     new Product('shark', './images/shark.jpg'),
//     new Product('sweep', './images/sweep.png'),
//     new Product('tauntaun', './images/tauntaun.jpg'),
//     new Product('unicorn', './images/unicorn.jpg'),
//     new Product('water-can', './images/water-can.jpg'),
//     new Product('wine-glass', './images/wine-glass.jpg'),
//   ];

//   }
//   return chartObject;
// }
