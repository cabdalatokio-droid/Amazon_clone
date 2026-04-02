import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../scipts/utils/money.js';
import { getProduct, loadProductsFetch } from './products.js';
import { addToCart, cart } from './cart.js';

// ✅ Orders stored in localStorage
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// ✅ Load page only if we are on orders page
async function loadPage() {
  await loadProductsFetch();
  renderOrders();
  updateCartQuantity();
}

if (document.querySelector('.js-order-grid')) {
  loadPage();
}

// ✅ Add new order
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

// ✅ Save orders to localStorage
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// ✅ Render all orders
function renderOrders() {
  const grid = document.querySelector('.js-order-grid');
  if (!grid) return;

  let orderHTML = '';

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format('MMMM D');
    let productsHTML = '';

    order.products.forEach((orderProduct) => {
      const matchingProduct = getProduct(orderProduct.productId);

      if (!matchingProduct) {
        console.error('Product not found:', orderProduct.productId);
        return;
      }

      const estimateDate = dayjs(orderProduct.estimatedDeliveryTime).format('MMM D');

      productsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-delivery-date">Arriving on: ${estimateDate}</div>
          <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
          <button class="buy-again-button button-primary js-pay-again" data-product-id="${orderProduct.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <button class="track-package-button button-secondary js-track-button" 
            data-order-id="${order.id}"
            data-product-id="${orderProduct.productId}">
            Track package
          </button>
        </div>
      `;
    });

    orderHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;
  });

  grid.innerHTML = orderHTML;

  // ✅ Buy Again Buttons
  document.querySelectorAll('.js-pay-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1);
      updateCartQuantity();

      const messageElement = button.querySelector('.buy-again-message');
      if (!messageElement) return;

      const originalText = messageElement.innerHTML;
      messageElement.innerHTML = 'Added';
      setTimeout(() => {
        messageElement.innerHTML = originalText;
      }, 2000);
    });
  });

  // ✅ Track Package Buttons
  document.querySelectorAll('.js-track-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const orderId = button.dataset.orderId;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
    });
  });
}

// ✅ Update cart quantity display
function updateCartQuantity() {
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const cartElem = document.querySelector('.js-cart-order-quantity');
  if (cartElem) cartElem.textContent = cartQuantity;
}









/*

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../scipts/utils/money.js';
import { getProduct,loadProductsFetch  } from './products.js';
import { addToCart,cart } from './cart.js';


export const orders=JSON.parse(localStorage.getItem('orders'))||[];

async function loadPage(){
  await loadProductsFetch();
  renderOrders();
   updateCartQuantity();
}
// loadPage();
if (document.querySelector('.js-order-grid')) {
  loadPage();
}


export function addOrder(order){
orders.unshift(order);
saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders))
}


function renderOrders() {
  let orderHTML = "";

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format("MMMM D");
    let productsHTML = ""; // Will hold all products for this order

    // Loop through products inside this order
    order.products.forEach((orderProduct) => {
      const matchingProduct = getProduct(orderProduct.productId);

      if (!matchingProduct) {
        console.error("Product not found:", orderProduct.productId);
        return;
      }

      const estimateDate = dayjs(orderProduct.estimatedDeliveryTime).format("MMM D");

      productsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-delivery-date">Arriving on: ${estimateDate}</div>
          <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
          <button class="buy-again-button button-primary js-pay-again" data-product-id="${orderProduct.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary js-track-button" 
            data-order-id="${order.id}"
            data-product-id="${orderProduct.productId}">Track package </button>
          </a>
        </div>
      `;
    });

    // Only one container per order
    orderHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML} <!-- All products go here -->
        </div>
      </div>
    `;
  });
  document.querySelector(".js-order-grid").innerHTML = orderHTML;

      document.querySelectorAll('.js-pay-again').forEach((button)=>{
          button.addEventListener('click',()=>{
           const  productId=button.dataset.productId;
           addToCart(productId,1);
          updateCartQuantity();
        const messageElement=button.querySelector('.buy-again-message');
        const originalText=messageElement.innerHTML;
     messageElement.innerHTML="Added";
     setTimeout(()=>{
      messageElement.innerHTML=originalText;
        },2000);
      
        });
      });


   document.querySelectorAll('.js-track-button').forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId=button.dataset.productId;
      const orderId=button.dataset.orderId;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
      });
   });
}



   function updateCartQuantity(){
          let cartQunatity=0;
          cart.forEach((cartItem)=>{
            cartQunatity+=cartItem.quantity
          });
          // const cartQunatity=cart.reduce((total,cartItem)=>total+cartItem.quantity,0);
          document.querySelector('.js-cart-order-quantity').textContent=cartQunatity;
        }*/