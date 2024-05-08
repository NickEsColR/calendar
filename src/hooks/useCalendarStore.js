import { useDispatch, useSelector } from "react-redux";
import { addNewEvent, deleteEvent, setActiveEvent, updateEvent } from "../store";
import { calendarApi } from "../api";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const onSetActiveEvent = (event) => {
        dispatch(setActiveEvent(event));
    }

    const startSavingEvent = async(calendarEvent) => {
        if ( calendarEvent._id ) {
            // Update
            dispatch(updateEvent(calendarEvent));
        } else {
            // Create
            const {data} = await calendarApi.post('/events', calendarEvent);
            const newEvent = { id: data.event._id, ...calendarEvent, user}
            dispatch(addNewEvent(newEvent));
        }
    }

    const startDeleteEvent = () => {
        dispatch(deleteEvent())
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        onSetActiveEvent,
        startSavingEvent,
        startDeleteEvent
    };
}
