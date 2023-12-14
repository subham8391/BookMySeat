import React,{useState} from 'react';
import TicketType from './TicketType'
import Quantity from './Quantity'
import { MdEventSeat, MdOutlineEventSeat } from "react-icons/md";
import Seats from './Seats';
import '../App.css'

function BookMySeat() {
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [ticketType, setTicketType] = useState('');
  
    const handleQuantityChange = (event) => {
      const quantity = parseInt(event.target.value, 10);
      setSelectedQuantity(quantity);
    };
    const handleTicketTypeChange = (type) => {
      setTicketType(type);
    };
    return (
      <>
        <div className="ticket-container">
          <div className="t-type_t-qty">
          <TicketType onChange={handleTicketTypeChange} />
            <Quantity onChange={handleQuantityChange} />
          </div>
          <div className="seat-section">
            <div className="seat-options">
              <div className="seats-container">
              <Seats selectedQuantity={selectedQuantity} ticketType={ticketType} />
              </div>
              
            </div>
            <div className="seat-layout">
              <h3>Key to Seat Layout:</h3>
              <span><MdEventSeat style={{ fontSize: '20px' }} /> Available</span>
              <span><MdEventSeat style={{ color: 'gray', fontSize: '20px' }} /> Unavailable</span>
              <span><MdEventSeat style={{ color: 'gold', fontSize: '20px' }} /> Premium</span>
              <span><MdEventSeat style={{ color: 'lightgreen', fontSize: '20px' }} />Your Selection</span>
            </div>
          </div>
        </div>
      </>
    )
}

export default BookMySeat