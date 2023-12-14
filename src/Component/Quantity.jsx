import React, { useState } from 'react';


function Quantity({ onChange }) {
  const options = [];
  for (let i = 1; i <= 10; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  const handleQuantityChange = (event) => {
    onChange(event);
  };

  return (
    <div className="quantity">
      <select id="quantitySelect" onChange={handleQuantityChange}>
        <option value="">Qty</option>
        {options}
      </select>
    </div>
  );
}


export default Quantity;
