import React, { useState } from 'react';

function TicketType({ onChange }) {
  const [ticketType, setTicketType] = useState('');

  const handleTicketTypeChange = (event) => {
    const type = event.target.value;
    setTicketType(type);
    onChange(type);
  };

  return (
    <div className="ticket-type">
      <select id="ticketType" onChange={handleTicketTypeChange}>
        <option value="">Ticket Type</option>
        <option value="general">General</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  );
}

export default TicketType;
