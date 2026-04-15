 function Cart(localStorageKey){
  const cart={
  cartItem:undefined,

      loadFromStorage:function(){
      this.cartItem=JSON.parse(localStorage.getItem(localStorageKey));

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
      },
      

      saveToStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
      },

      
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
     },



       removeFromCart(productId){
       const newCart=[];
         this.cartItem.forEach((cartItem)=>{
       if(cartItem.productId!==productId){
       newCart.push(cartItem)
      }
 });
     this.cartItem=newCart;
      this.saveToStorage();
},
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



};
 return cart;
 }


const cart=Cart("cart-oop");
const businnesCart=Cart("cart-business");


cart.loadFromStorage();
businnesCart.loadFromStorage();
console.log(cart);
console.log(businnesCart);

 















































// class task{

//   constructor(description){
//     this.description=description;
//     this.completed=false;
//   }
//   toggle(){
//     this.completed=!this.completed;
//   }
// }

// const arry=[];
// function addNewTask(description){
//   let input=document.getElementById('task-input');
//   if(!input.value)return;
//   const newTask=new task(input.value);
//   arry.push(newTask);
//   input.value='';
// }

// function renderTask(){
//   const taskList=document.getElementById('task-list');
//   taskList.innerHTML='';
//   arry.forEach((task,index)=>{
//     const li=document.createElement('li');
//     li.textContent=task.description+(task.completed? "✅":"⏳");
//     li.addEventListener('click',()=>{
//       task.toggle();
//       renderTask();
//     });
//     li.addEventListener('contextmenu',(e)=>{
//       e.preventDefault();
//       arry.splice(index,1);
//       renderTask();
//     });
//     taskList.appendChild(li);
// })
// }












// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>JS Class Task Manager</title>
//     <style>
//         /* CSS: Making it look modern */
//         body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background-color: #f4f7f6;
//             display: flex;
//             justify-content: center;
//             padding: 50px;
//         }

//         .container {
//             background: white;
//             padding: 2rem;
//             border-radius: 12px;
//             box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//             width: 100%;
//             max-width: 400px;
//         }

//         h1 { color: #333; font-size: 1.5rem; margin-bottom: 1.5rem; }

//         .input-group {
//             display: flex;
//             gap: 10px;
//             margin-bottom: 20px;
//         }

//         input {
//             flex: 1;
//             padding: 10px;
//             border: 2px solid #ddd;
//             border-radius: 6px;
//             outline: none;
//         }

//         input:focus { border-color: #4caf50; }

//         button#addBtn {
//             background-color: #4caf50;
//             color: white;
//             border: none;
//             padding: 10px 15px;
//             border-radius: 6px;
//             cursor: pointer;
//             font-weight: bold;
//         }

//         ul { list-style: none; padding: 0; }

//         li {
//             background: #fff;
//             border-bottom: 1px solid #eee;
//             padding: 12px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             transition: background 0.2s;
//         }

//         li:hover { background: #fafafa; }

//         .task-text {
//             cursor: pointer;
//             flex: 1;
//             font-size: 1rem;
//         }

//         .completed {
//             text-decoration: line-through;
//             color: #888;
//         }

//         .delete-btn {
//             background: #ffeded;
//             color: #ff4d4d;
//             border: 1px solid #ff4d4d;
//             padding: 5px 10px;
//             border-radius: 4px;
//             font-size: 0.8rem;
//             cursor: pointer;
//         }

//         .delete-btn:hover {
//             background: #ff4d4d;
//             color: white;
//         }
//     </style>
// </head>
// <body>

// <div class="container">
//     <h1>My Task Manager</h1>
    
//     <div class="input-group">
//         <input type="text" id="taskInput" placeholder="What needs doing?">
//         <button id="addBtn" onclick="addNewTask()">Add</button>
//     </div>

//     <ul id="taskList"></ul>
// </div>

// <script>
//     // 1. THE CLASS (The Blueprint)
//     class Task {
//         constructor(description) {
//             this.description = description;
//             this.isCompleted = false;
//         }

//         toggle() {
//             this.isCompleted = !this.isCompleted;
//         }
//     }

//     // 2. THE DATA (The Storage)
//     const myTasks = [];

//     // 3. THE LOGIC (Adding)
//     function addNewTask() {
//         const input = document.getElementById('taskInput');
        
//         if (input.value.trim() !== "") {
//             const newTask = new Task(input.value);
//             myTasks.push(newTask);
//             renderTasks();
//             input.value = "";
//         }
//     }

//     // 4. THE LOGIC (Deleting)
//     function deleteTask(index) {
//         myTasks.splice(index, 1);
//         renderTasks();
//     }

//     // 5. THE RENDERER (Displaying)
//     function renderTasks() {
//         const list = document.getElementById('taskList');
//         list.innerHTML = ""; 

//         myTasks.forEach((task, index) => {
//             const li = document.createElement('li');
            
//             // Create Task Text Span
//             const taskText = document.createElement('span');
//             taskText.className = "task-text" + (task.isCompleted ? " completed" : "");
//             taskText.textContent = (task.isCompleted ? "✅ " : "⏳ ") + task.description;
            
//             taskText.onclick = () => {
//                 task.toggle();
//                 renderTasks();
//             };

//             // Create Delete Button
//             const delBtn = document.createElement('button');
//             delBtn.className = "delete-btn";
//             delBtn.textContent = "Delete";
//             delBtn.onclick = () => deleteTask(index);

//             // Assemble
//             li.appendChild(taskText);
//             li.appendChild(delBtn);
//             list.appendChild(li);
//         });
//     }

//     // Allow pressing "Enter" to add a task
//     document.getElementById("taskInput").addEventListener("keypress", function(event) {
//         if (event.key === "Enter") {
//             addNewTask();
//         }
//     });
// </script>

// </body>
// </html>