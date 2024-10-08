const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

function addItemToCart(productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity
  };
  cart.push(newItem);
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId); 
  let name = req.query.name; 
  let price = parseFloat(req.query.price); 
  let quantity = parseInt(req.query.quantity); 
  let result = addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editItemQuantity(productId, newQuantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = newQuantity;
      break; 
    }
  }
  return cart; 
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId); 
  let newQuantity = parseInt(req.query.quantity); 
  let result = editItemQuantity(productId, newQuantity);
  res.json({ cartItems: result });
});

function deleteItemFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  return cart;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId); 
  let result = deleteItemFromCart(productId); 
  res.json({ cartItems: result });
});

function getCartItems() {
  return cart;
}
app.get('/cart', (req, res) => {
  let result = getCartItems(); 
  res.json({ cartItems: result }); 
});

function calculateTotalQuantity() {
  let totalQuantity = 0; 
  for (let i = 0; i < cart.length; i++) { 
    totalQuantity += cart[i].quantity;  
  }
  return totalQuantity; 
}
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity(); 
  res.json({ totalQuantity: totalQuantity }); 
});

function calculateTotalPrice() {
  let totalPrice = 0; 
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity; 
  }
  return totalPrice; 
}
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(); 
  res.json({ totalPrice: totalPrice });  
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
