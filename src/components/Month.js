import React from 'react'
import Grid from '@mui/material/Grid'; // Grid version 1
import Day from './Day';
import { Box } from '@mui/material';

export default function Month({month}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 7, sm: 7, md: 7 }}>
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Grid item xs={1} sm={1} md={1} >
                            <Day day={day} rowId={i}/>
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
        </Grid>
    </Box>
  )
}
