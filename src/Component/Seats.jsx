import React, { useState, useEffect } from 'react';
import { MdEventSeat } from 'react-icons/md';

function Seats({ selectedQuantity, ticketType }) {
  const rows = Array.from({ length: 15 }, (_, index) => String.fromCharCode(79 - index));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [disabledRows, setDisabledRows] = useState([]);
  const [disabledColumns, setDisabledColumns] = useState([]);

  useEffect(() => {
    const bookedSeatsData = localStorage.getItem('bookedSeats');
    const selectedSeatsData = localStorage.getItem('selectedSeats');

    if (bookedSeatsData) {
      setBookedSeats(JSON.parse(bookedSeatsData));
    }
    if (selectedSeatsData) {
      setSelectedSeats(JSON.parse(selectedSeatsData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [bookedSeats, selectedSeats]);

  useEffect(() => {
    if (ticketType === 'premium') {
      setDisabledRows([]);
      setDisabledColumns([]);
    } else {
      setDisabledRows([0, 1]);
      setDisabledColumns([0, 1, 2]);
    }
  }, [ticketType]);

  const toggleSeat = (rowIndex, colIndex) => {
    const seat = `${rows[rowIndex]}${colIndex + 1}`;
    const seatIndex = selectedSeats.indexOf(seat);

    if (seatIndex > -1) {
      setSelectedSeats((prevSelected) => prevSelected.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < selectedQuantity) {
        setSelectedSeats((prevSelected) => [...prevSelected, seat]);
      }
    }
  };

  const bookSelectedSeats = () => {
    if (selectedSeats.length === selectedQuantity) {
      const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
      setBookedSeats(updatedBookedSeats);
      setSelectedSeats([]);

      // Update local storage with the updated booked seats
      localStorage.setItem('bookedSeats', JSON.stringify(updatedBookedSeats));
  
      // Logic to release booked seats after 5 minutes
      setTimeout(() => {
        setBookedSeats(prevBookedSeats => {
          const remainingSeats = prevBookedSeats.filter(seat => !selectedSeats.includes(seat));
          localStorage.setItem('bookedSeats', JSON.stringify(remainingSeats));
          return remainingSeats;
        });
      }, 5 * 60 * 1000);
    }
  };
  // Function to generate shouldHide condition
  const getShouldHideCondition = (rowIndex, colIndex) => {
    if (rowIndex === 0) {
      return [1, 2, 3, 6, 9, 12, 15, 18, 21, 24, 25].includes(colIndex + 1);
    }
    if (rowIndex === 1) {
      return [1, 2, 3, 6, 9, 12, 15, 18, 19, 22, 25].includes(colIndex + 1);
    }
    if ((rowIndex >= 2 && rowIndex <= 6) || (rowIndex >= 9 && rowIndex <= 14)) {
      return [1, 2, 3, 4, 19].includes(colIndex + 1);
    }
    if (rowIndex === 7 || rowIndex === 8) {
      return [4, 19].includes(colIndex + 1);
    }
    return false;
  };

  return (
    <>
      <div className='seats-grid'>
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div style={{ gridColumn: '1 / span 1', gridRow: `${rowIndex + 1} / span 1` }}>{row}</div>
            {Array.from({ length: 25 }, (_, colIndex) => {
              const shouldHide = getShouldHideCondition(rowIndex, colIndex);
              const seat = `${row}${colIndex + 1}`;
              const isSelected = selectedSeats.includes(seat);
              const isBooked = bookedSeats.includes(seat);

              const isDisabledRow = disabledRows.includes(rowIndex);
              const isDisabledColumn = disabledColumns.includes(colIndex);

              if (shouldHide) {
                return null;
              }

              return (
                <div
                  key={`${row}-${colIndex}`}
                  style={{
                    gridColumn: `${colIndex + 2} / span 1`,
                    gridRow: `${rowIndex + 1} / span 1`,
                    cursor: (isSelected || isDisabledRow || isDisabledColumn) ? 'default' : 'pointer',
                    color: isBooked ? 'lightgray' : 'inherit',
                  }}
                  onClick={() => !isDisabledRow && !isDisabledColumn && toggleSeat(rowIndex, colIndex)}
                >
                  {isSelected ? (
                    <MdEventSeat style={{ color: 'lightgreen', fontSize: '20px' }} />
                  ) : (
                    (isDisabledRow || isDisabledColumn) ? (
                      <MdEventSeat style={{ color: 'gold', fontSize: '20px' }} />
                    ) : (
                      <MdEventSeat style={{ fontSize: '20px' }} />
                    )
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="proceed-action">
        <button onClick={bookSelectedSeats} className='p-btn'>PROCEED</button>
      </div>
    </>
  );
}

export default Seats;