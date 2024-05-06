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
        },
        updateEvent: (state, {payload}) => {
            state.events = state.events.map((event) =>
                event._id === payload._id ? payload : event
            );
        },
        deleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    },
});

export const {setActiveEvent, addNewEvent, updateEvent, deleteEvent} = calendarSlice.actions;
