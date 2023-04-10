import React, { useContext, useEffect, useState } from "react";

import { Box, Button, Modal, TextField } from "@mui/material";
import SmallCalendar from "./SmallCalendar";
import GlobalContext from "../context/GlobalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
};

export default function EventModal() {
  const {
    showEventModal,
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    setTitle(selectedEvent ? selectedEvent.title : "")
    setDescription(selectedEvent ? selectedEvent.description : "")
  }, [selectedEvent])


  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    clearForm();
    setShowEventModal(false);
  }
  console.log(title);

  function clearForm() {
    setTitle("");
    setDescription("");
  }
  return (
    <Modal
      open={showEventModal}
      onClose={() => {
        setShowEventModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <header>
          <h3>Add A New Note</h3>
        </header>
        {selectedEvent && (
          <Button
            variant="contained"
            onClick={() => {
              dispatchCalEvent({ type: "delete", payload: selectedEvent });
              clearForm();
              setShowEventModal(false);
            }}
          >
            delete
          </Button>
        )}
        <SmallCalendar />
        <TextField
          id="standard-basic"
          label="Add Title"
          variant="standard"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>{daySelected.format("dddd, MMMM DD")}</h3>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          name="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
