import { useDispatch, useSelector } from "react-redux";
import {
    addNewEvent,
    deleteEvent,
    onloadEvents,
    setActiveEvent,
    updateEvent,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const onSetActiveEvent = (event) => {
        dispatch(setActiveEvent(event));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent._id) {
                // Update
                await calendarApi.put(
                    `/events/${calendarEvent._id}`,
                    calendarEvent
                );
                dispatch(updateEvent({ ...calendarEvent, user }));
                return;
            }
            // Create
            const { data } = await calendarApi.post("/events", calendarEvent);
            const newEvent = { _id: data.event._id, ...calendarEvent, user };
            dispatch(addNewEvent(newEvent));
        } catch (error) {
            Swal.fire("Error al guardar", error.response.data.message, "error");
        }
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDateEvents(data.events);
            dispatch(onloadEvents(events));
        } catch (error) {
            console.log(error);
        }
    };

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent._id}`);
            dispatch(deleteEvent());
        } catch (error) {
            Swal.fire(
                "Error al eliminar",
                error.response.data.message,
                "error"
            );
        }
    };

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        onSetActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeleteEvent,
    };
};
