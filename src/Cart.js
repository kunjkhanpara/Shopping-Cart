import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'T-shirt', price: 20, qty: 1 },
    { id: 2, name: 'Jeans', price: 50, qty: 1 },
    { id: 3, name: 'Shoes', price: 80, qty: 1 },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const incrementQuantity = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setItems(items.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  const addItem = () => {
    if (newItemName.trim() && newItemPrice > 0) {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        price: parseFloat(newItemPrice),
        qty: 1,
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  return (
    <div className="cart-wrapper">
      <h1>Shopping Cart</h1>
      <div className="cart-grid">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
      </div>

      <div className="new-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Cart;
