import React, { useContext } from 'react'
import Icon from '@mdi/react';
import { mdiArrowLeftBold, mdiArrowRightBold, mdiPlus } from '@mdi/js';
import { Button, ButtonGroup } from '@mui/material';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { setShowEventModal } = useContext(GlobalContext)

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className='App-header header'>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={handlePrevMonth}>
                <Icon path={mdiArrowLeftBold} size={1} />
            </Button>
            <Button onClick={handleReset}>Today</Button>
            <Button onClick={handleNextMonth}>            
                <Icon path={mdiArrowRightBold} size={1} />
            </Button>
        </ButtonGroup>
        <h2 className="">
            {dayjs(new Date(dayjs().year(), monthIndex)).format(
            "MMMM YYYY"
            )}
        </h2>
        <Button onClick={()=> setShowEventModal(true)}>
            <Icon path={mdiPlus} size={1} />
            Create
        </Button>
    </header>
  )
}
