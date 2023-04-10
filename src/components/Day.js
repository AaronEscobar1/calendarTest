import React, { useContext, useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { currentDay } from '../util';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
import { Chip } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Day({day, rowId}) {

  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(evt => 
      dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
      )
      setDayEvents(events)
  }, [savedEvents, day]);

  return (
    <div onClick={() => {setDaySelected(day);setShowEventModal(true)}}>
      <Item className={`cursor-pointer min ${currentDay(day)}`}>
        <header>
          {rowId === 0 && (<p>{day.format('ddd').toUpperCase()}</p>)}
          <p >{day.format('DD')}</p>
        </header>
        {dayEvents.map((evt, index) => (
          <Chip key={index} onClick={(e) => {setSelectedEvent(evt)}} label={evt.title} />
        ))}
      </Item>
    </div>
  )
}
