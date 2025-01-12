import React, { useState,  } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Milk (1 L)', price: 50, qty: 0 },
    { id: 2, name: 'Bread (500 g)', price: 30, qty: 0 },
    { id: 3, name: 'Eggs (12)', price: 60, qty: 0 },
    { id: 4, name: 'Rice (1 kg)', price: 40, qty: 0 },
    { id: 5, name: 'Cooking Oil (1 L)', price: 150, qty: 0 },
    { id: 6, name: 'Wheat Flour (1 kg)', price: 40, qty: 0 },
    { id: 7, name: 'Sugar (1 kg)', price: 35, qty: 0 },
    { id: 8, name: 'Tea (500 g)', price: 100, qty: 0 },
    { id: 9, name: 'Coffee (200 g)', price: 120, qty: 0 },
    { id: 10, name: 'Toothpaste (1)', price: 40, qty: 0 },
    { id: 11, name: 'Soap (1)', price: 25, qty: 0 },
    { id: 12, name: 'Shampoo (200 ml)', price: 80, qty: 0 },
    { id: 13, name: 'Salt (1 kg)', price: 15, qty: 0 },
    { id: 14, name: 'Butter (200 g)', price: 50, qty: 0 },
    { id: 15, name: 'Paneer (200 g)', price: 75, qty: 0 },
    { id: 16, name: 'Curd (500 g)', price: 40, qty: 0 },
    { id: 17, name: 'Biscuit Pack', price: 20, qty: 0 },
    { id: 18, name: 'Chips Pack', price: 30, qty: 0 },
    { id: 19, name: 'Detergent (1 kg)', price: 80, qty: 0 },
    { id: 20, name: 'Dishwashing Liquid (500 ml)', price: 60, qty: 0 },
    { id: 21, name: 'Spices Pack (100 g)', price: 40, qty: 0 },
    { id: 22, name: 'Masala Powder (100 g)', price: 35, qty: 0 },
    { id: 23, name: 'Pickles (500 g)', price: 75, qty: 0 },
    { id: 24, name: 'Honey (500 g)', price: 150, qty: 0 },
    { id: 25, name: 'Jam (500 g)', price: 80, qty: 0 },
    { id: 26, name: 'Chocolates', price: 60, qty: 0 },
    { id: 27, name: 'Ice Cream (500 ml)', price: 90, qty: 0 },
    { id: 28, name: 'Noodles (Pack of 5)', price: 50, qty: 0 },
    { id: 29, name: 'Ready-to-Eat Meal', price: 100, qty: 0 },
    { id: 30, name: 'Vegetables (Mixed, 1 kg)', price: 50, qty: 0 },
    { id: 31, name: 'Fruits (Mixed, 1 kg)', price: 60, qty: 0 },
    { id: 32, name: 'Juice (1 L)', price: 80, qty: 0 },
    { id: 33, name: 'Cold Drinks (1.5 L)', price: 50, qty: 0 },
    { id: 34, name: 'Ketchup (500 g)', price: 70, qty: 0 },
    { id: 35, name: 'Mayonnaise (500 g)', price: 100, qty: 0 },
    { id: 36, name: 'Breadsticks', price: 40, qty: 0 },
    { id: 37, name: 'Cheese (200 g)', price: 100, qty: 0 },
    { id: 38, name: 'Peanut Butter (500 g)', price: 150, qty: 0 },
    { id: 39, name: 'Mint (1 Pack)', price: 10, qty: 0 },
    { id: 40, name: 'Tea Bags (10 pcs)', price: 15, qty: 0 },
    { id: 41, name: 'Chocolate (Pack)', price: 18, qty: 0 },
    { id: 42, name: 'Nuts (Small Pack)', price: 20, qty: 0 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    mobile: '+91',
    city: '',
    address: '',
    pincode: '',
    district: '',
    state: '',
  });
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const increment = (id) => setItems(items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const decrement = (id) => setItems(items.map(i => i.id === id && i.qty > 0 ? { ...i, qty: i.qty - 1 } : i));
  const totalPrice = () => items.reduce((t, i) => t + i.price * i.qty, 0);
  const gst = () => (totalPrice() * 0.18).toFixed(2);
  const deliveryCharge = () => (totalPrice() < 500 ? 40 : 0); 
  const grandTotal = () => (totalPrice() + parseFloat(gst()) + deliveryCharge()).toFixed(2);

  const summary = items
    .filter(i => i.qty > 0)
    .map(i => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`)
    .join(', ');

  const suggestionThreshold = 500;
  const currentTotal = totalPrice();
  const remainingForFreeDelivery = suggestionThreshold - currentTotal;

  const showSuggestions = remainingForFreeDelivery === 50;
  const suggestionItems = items.filter(i => i.id >= 39);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleItemClick = (item) => navigate(`/item/${item.id}`);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // Generate random order ID
    const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setOrderId(randomOrderId);
    setIsCheckedOut(true);

    // Reset cart after 10 seconds
    setTimeout(() => {
      setItems(items.map(i => ({ ...i, qty: 0 })));
      setUserInfo({
        name: '',
        mobile: '+91',
        city: '',
        address: '',
        pincode: '',
        district: '',
        state: '',
      });
      setIsCheckedOut(false);
      setSearchQuery('');
      setOrderId('');
    }, 10000);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Kunj Shopping Cart</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search items"
        className="search-input"
      />
      <div className="cart-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="cart-item" onClick={() => handleItemClick(item)}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <div className="qty-controls">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {isCheckedOut && (
        <div className="checkout-summary">
          <h2>Thank you for placing your order!</h2>
          <p>Your order ID: {orderId}</p>
          <p>Your items will be delivered soon.</p>
          <p>If you have any issues, contact us at kunjwhtsapp@gmail.com.</p>
        </div>
      )}

      {!isCheckedOut && (
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>{summary}</p>
          <p>Total: ₹{totalPrice()}</p>
          <p>GST (18%): ₹{gst()}</p>
          <p>Delivery Charge: ₹{deliveryCharge()}</p>
          <p>Grand Total: ₹{grandTotal()}</p>

          {showSuggestions && (
            <div className="suggestions">
              <h4>Suggested Items:</h4>
              {suggestionItems.map(item => (
                <div key={item.id}>
                  <p>{item.name} - ₹{item.price}</p>
                </div>
              ))}
            </div>
          )}

          <h3>Enter your details</h3>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="mobile"
            value={userInfo.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
          />
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="pincode"
            value={userInfo.pincode}
            onChange={handleInputChange}
            placeholder="Pincode"
          />
          <input
            type="text"
            name="district"
            value={userInfo.district}
            onChange={handleInputChange}
            placeholder="District"
          />
          <input
            type="text"
            name="state"
            value={userInfo.state}
            onChange={handleInputChange}
            placeholder="State"
          />

          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
