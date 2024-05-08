import { createSlice } from "@reduxjs/toolkit";
import { onLogout } from "../auth/authSlice";

const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        addNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        updateEvent: (state, { payload }) => {
            state.events = state.events.map((event) =>
                event._id === payload._id ? payload : event
            );
        },
        onloadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach((event) => {
                const exists = state.events.some(
                    (dbEvent) => dbEvent._id === event._id
                );
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        deleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(
                    (event) => event._id !== state.activeEvent._id
                );
                state.activeEvent = null;
            }
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        },
    },
});

export const {
    setActiveEvent,
    addNewEvent,
    updateEvent,
    deleteEvent,
    onloadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;
