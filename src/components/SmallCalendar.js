import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { currentDay, getMonth } from "../util";
import { Box, Button, ButtonGroup, Grid, Paper, styled } from "@mui/material";
import Icon from "@mdi/react";
import { mdiArrowLeftBold, mdiArrowRightBold } from '@mdi/js';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setDaySelected,
    setShowEventModal
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            "MMMM YYYY"
          )}
        </p>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={handlePrevMonth}>
                <Icon path={mdiArrowLeftBold} size={1} />
            </Button>
            <Button onClick={handleNextMonth}>            
                <Icon path={mdiArrowRightBold} size={1} />
            </Button>
        </ButtonGroup>
      </header>
      <Box sx={{ flexGrow: 1 }} className='smallCalendarContainer'>
        <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 7, sm: 7, md: 7 }}>
            {currentMonth.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Grid item xs={1} sm={1} md={1} key={idx}>
                            <Item className={` smallCalendar ${currentDay(day)}`} onClick={() => {
                                setDaySelected(day);
                                setShowEventModal(true);
                            }}>
                                <header>
                                    {i === 0 && (<p className="smallCalendar">{day.format('dd').toUpperCase()}</p>)}
                                    <p className="smallCalendar">{day.format('DD')}</p>
                                </header>
                            </Item>
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
        </Grid>
      </Box>
    </div>
  );
}