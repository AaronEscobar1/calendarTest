import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { getMonth } from './util';
import CalendarHeader from './components/CalendarHeader';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';

function App() {
  const { 
    monthIndex, 
   } = useContext(GlobalContext);

  const [currentMonth, setCurrentMonth] = useState(getMonth())

useEffect(()=> {
  setCurrentMonth(getMonth(monthIndex))
}, [monthIndex])

  return (
    <React.Fragment>
        <div className="h-screen flex flex-columns">
          <CalendarHeader />
          <div>
            <Month month={currentMonth}/>
          </div>
        </div>
        <EventModal />
    </React.Fragment>
  );
}

export default App;
