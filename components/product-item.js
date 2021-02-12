// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    super();
    this.added = false;
    this.attachShadow({mode: 'open'});

    let li = document.createElement('li');
    let img = document.createElement('img');
    let caption = document.createElement('p');
    let cost = document.createElement('p');
    let button = document.createElement('button');

    li.setAttribute('class', 'product');

    let des = this.getAttribute('des');
    let url = this.getAttribute('url');
    let price = this.getAttribute('price');
    let productID = this.getAttribute('id');
    img.setAttribute('src', url);
    img.setAttribute('alt', des);

    caption.setAttribute('class', 'title');
    cost.setAttribute('class', 'price');
    caption.innerText = des;
    cost.innerText = "$"+parseFloat(price).toFixed(2);

    button.setAttribute('onclick', `cartItem(${productID})`);
    button.innerText = 'Add to Cart';

    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(li);
    li.appendChild(img);
    li.appendChild(caption);
    li.appendChild(cost);
    li.appendChild(button);
  }

}

customElements.define('product-item', ProductItem);