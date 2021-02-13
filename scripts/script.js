// Script.js

let set;

window.addEventListener('DOMContentLoaded', () => {

  if(localStorage.getItem('array') === null){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem('array', JSON.stringify(data)));
  }
  let array = JSON.parse(localStorage.getItem('array'));
  console.log(array);

  let listContainer = document.getElementById('product-list');
  for(let i = 0; i < array.length; ++i){
    listContainer.innerHTML += `
      <product-item url="${array[i].image}" 
      des="${array[i].title}" 
      price="${array[i].price}"
      id = "${array[i].id}">
      </product-item>
    `;
  }

  let cartItems = localStorage.getItem('cartItems');
  if(cartItems == null){
    set = new Set();
  } else{
    set = new Set(cartItems.split(","));
  }
  if(set.has("")){
    set.clear();
  }
  initItems();

});

function cartItem(productID){
  let item = document.getElementById(productID);
  let button = item.shadowRoot.querySelector('button');
  let message = '';
  if(set.has(productID.toString())){
    message = 'Removed from cart!';
    button.innerText = 'Add to cart';
    set.delete(productID.toString());
  } else{
    message = 'Added to cart!';
    button.innerText = 'Remove from cart';
    set.add(productID.toString());
  }
  setItemNum();
  let cartItems = localStorage.setItem('cartItems', [...set.keys()].join());
  alert(message);
}

function initItems(){
  for(let key of set){
    let item = document.getElementById(key);
    let button = item.shadowRoot.querySelector('button');
    button.innerText = 'Remove from cart'; 
  }
  setItemNum();
}

function setItemNum(){
  let numItems = document.getElementById('cart-count');
  numItems.innerText = set.size;
}