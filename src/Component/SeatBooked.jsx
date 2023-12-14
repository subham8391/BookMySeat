import React from 'react'
import { Link } from 'react-router-dom'
import ticket from '../images/Ticket.jpg'
function SeatBooked() {
  return (
    <>
      <div className="seat-book-container">
        <div className="ticke-img"><img src={ticket} alt="" /></div>
        <h2>Welldone! You Successfully booking the seat.</h2>
        <h2>Enjoy Your Movie</h2>
        <Link to="/">Go Back</Link>
      </div>
    </>
  )
}

export default SeatBooked