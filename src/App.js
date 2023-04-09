import React, { createContext, useState } from 'react';
import logo from '../src/assets/logo.png'
import './App.css';
import { SchoolFilter } from './components/SchoolFilter';
import { RevenueChart } from './components/RevenueChart';
import { ConversionRate } from './components/ConversionRate';
import { UpcomingReservations } from './components/UpcomingReservations';

export const SchoolContext = createContext();

function App() {
  const [school, setSchool] = useState("All Schools")

  return (
    <SchoolContext.Provider value={{ school, setSchool }}>
      <div className="App">
          <div className="header-container">
            <img src={logo} className="App-logo" alt="Greenbox Storage" />
            <h1>Dashboard</h1>
            <SchoolFilter />
          </div>
        
        <div className="chart-container">
          <RevenueChart />
        </div>

        <div className="chart-container">
          <h2>Conversion Rate</h2>
          <ConversionRate />
        </div>

        <div className="chart-container">
          <h2>Upcoming Reservations</h2>
          <UpcomingReservations />
        </div>
      </div>
    </SchoolContext.Provider>
  );
}

export default App;
