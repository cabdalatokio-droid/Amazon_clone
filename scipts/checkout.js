import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import{loadProductsFetch} from'../data/products.js';
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import '../data/backend-practice.js';

 async function loadPage(){
  try{
    // throw 'error1'
   await loadProductsFetch();

      await  new Promise((resolve,reject)=>{
        // throw 'error'
      loadCart(()=>{
      //  reject('error3');
      resolve();
      });
    });

  } catch(error){
  console.log('Unexpected error.please try again');
  }

   renderOrderSummary();
    renderPaymentSummary();
  return 'value';
}

loadPage();