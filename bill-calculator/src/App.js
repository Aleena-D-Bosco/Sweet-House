import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([{ name: "", price: "", qty: "" }]);
  const [discount, setDiscount] = useState(0);

  const handleChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", qty: "" }]);
  };

  const calculateTotal = () => {
    let subtotal = items.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const qty = parseInt(item.qty) || 0;
      return acc + price * qty;
    }, 0);

    let discountAmount = (subtotal * discount) / 100;
    let total = subtotal - discountAmount;

    return { subtotal, discountAmount, total };
  };

  const { subtotal, discountAmount, total } = calculateTotal();

  return (
    <div className="calculator">
      <h1>🍰 Sweet House Bill Calculator</h1>
      <p className="subtitle">Add your bakery items & apply discounts</p>

      {items.map((item, index) => (
        <div className="item-row" key={index}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="number"
            name="qty"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}

      <button className="add-btn" onClick={addItem}>
        ➕ Add Item
      </button>

      <div className="discount">
        <label>Discount (%): </label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <div className="result-card">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Discount: ₹{discountAmount.toFixed(2)}</p>
        <h2>Total: ₹{total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
