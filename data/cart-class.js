 class Cart{
    cartItem=undefined;
    #localStorageKey=undefined;

    constructor(localStorageKey){
      this.#localStorageKey=localStorageKey;
      this.#loadFromStorage();
    }

     #loadFromStorage(){
      this.cartItem=JSON.parse(localStorage.getItem(this.#localStorageKey));

      if(!this.cartItem){
        this.cartItem=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
      },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
      }];
      }
      }


      saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
      }
        

         
       addToCart(productId){
        let matchingItem=this.cartItem.find(cartItem=>cartItem.productId===productId);
    
        if(matchingItem){
          matchingItem.quantity+=1;
        }
        else{
        this.cartItem.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:'1'
        });
      }
      this.saveToStorage();
     }

            removeFromCart(productId){
       const newCart=[];
         this.cartItem.forEach((cartItem)=>{
       if(cartItem.productId!==productId){
       newCart.push(cartItem)
      }
 });
     this.cartItem=newCart;
      this.saveToStorage();
}

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItem.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
    });
    
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  }
     

 }
 



const cart=new Cart('cart-oop');
const businnesCart=new Cart('cart-business');
console.log(cart);
console.log(businnesCart);




// waxaan kasoowariday qaybta reac

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [], // Will hold objects like: { id, title, price, image, quantity, deliveryOption }
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // 1. Add an item to the cart or increment its quantity if it already exists
//     addToCart: (state, action) => {
//       const existingProduct = state.products.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         // Spread the payload product and set initial quantity and default delivery
//         state.products.push({ 
//           ...action.payload, 
//           quantity: 1,
//           deliveryOption: "tuesday" 
//         });
//       }
//     },

//     // 2. Remove an item completely from the cart (Linked to your "Delete" button)
//     removeFromCart: (state, action) => {
//       state.products = state.products.filter(
//         (item) => item.id !== action.payload
//       );
//     },

//     // 3. Update quantity manually (Linked to your "Update" button)
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const product = state.products.find((item) => item.id === id);
//       if (product && quantity > 0) {
//         product.quantity = quantity;
//       }
//     },

//     // 4. Update selected shipping speed (Linked to your delivery radio buttons)
//     updateDeliveryOption: (state, action) => {
//       const { id, option } = action.payload;
//       const product = state.products.find((item) => item.id === id);
//       if (product) {
//         product.deliveryOption = option;
//       }
//     }
//   }
// });

// // Export actions to use in your components via useDispatch()
// export const { addToCart, removeFromCart, updateQuantity, updateDeliveryOption } = cartSlice.actions;

// // Export the reducer to plug into your configureStore
// export default cartSlice.reducer;