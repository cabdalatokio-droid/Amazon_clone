
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from './orders.js';
import { getProduct, loadProductsFetch } from './products.js';
import { cart } from './cart.js'; 
async function loadTrackingPage() {
  await loadProductsFetch();
  renderCartQuantity(); 
  renderTrackingPage();
}

loadTrackingPage();

function renderTrackingPage() {
  const container = document.querySelector('.js-order-tracking');
  if (!container) return;

  //console.log('----- TRACKING DEBUG START -----');

  // 1️⃣ Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const productId = params.get('productId');

  console.log('URL:', window.location.href);
  console.log('orderId from URL:', orderId);
  console.log('productId from URL:', productId);

  if (!orderId || !productId) {
    console.log('❌ Missing orderId or productId');
    renderNotFound(container);
    return;
  }

  console.log('All orders from localStorage:', orders);

  // 2️⃣ Find order
  const order = orders.find(o => String(o.id) === orderId);
  if (!order) {
    console.log('❌ Order not found');
    renderNotFound(container);
    return;
  }
  console.log('Matched order:', order);

  // 3️⃣ Find product inside order
  const orderProduct = order.products.find(p => String(p.productId) === productId);
  if (!orderProduct) {
    console.log('❌ Product not found inside order');
    renderNotFound(container);
    return;
  }
  console.log('Matched product inside order:', orderProduct);

  // 4️⃣ Get product info
  const productDetails = getProduct(productId);
  if (!productDetails) {
    console.log('❌ Product details not found');
    renderNotFound(container);
    return;
  }
  console.log('Product details from products.js:', productDetails);

  // 5️⃣ Delivery date
  const deliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D');

  // 6️⃣ Progress percentage
  const progressPercent = calculateProgress(order.orderTime, orderProduct.estimatedDeliveryTime);

  // 7️⃣ Determine status
  const status = progressPercent === 100 ? 'Delivered' : progressPercent > 50 ? 'Shipped' : 'Preparing';

  // 8️⃣ Render HTML
  container.innerHTML = `
    <a href="orders.html" class="link-primary">View all orders</a>

    <div class="delivery-date">
      ${status === 'Delivered'
        ? `Delivered on ${deliveryDate}`
        : `Arriving on ${deliveryDate}`}
    </div>

    <div class="product-info">${productDetails.name}</div>
    <div class="product-info">Quantity: ${orderProduct.quantity}</div>
    <img class="product-image" src="${productDetails.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${status === 'Preparing' ? 'current-status' : ''}">Preparing</div>
      <div class="progress-label ${status === 'Shipped' ? 'current-status' : ''}">Shipped</div>
      <div class="progress-label ${status === 'Delivered' ? 'current-status' : ''}">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${progressPercent}%"></div>
    </div>
  `;

  console.log('----- TRACKING DEBUG END -----');
}