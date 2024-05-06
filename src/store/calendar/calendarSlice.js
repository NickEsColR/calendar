import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    _id: new Date().getTime().toString(),
    title: "All Day Event very long title",
    notes: "this is",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        _id: "123",
        name: "Fernando",
    },
}

const initialState = {
    events: [
        tempEvent
    ],
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        addNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        } 
    },
});

export const {setActiveEvent, addNewEvent} = calendarSlice.actions;
