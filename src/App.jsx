import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import BookMySeat from './Component/BookMySeat';
import SeatBooked from './Component/SeatBooked';
function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<BookMySeat />} />
            <Route path="/Success" element={<SeatBooked />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
