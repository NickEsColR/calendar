import { useDispatch, useSelector } from "react-redux";
import { addNewEvent, setActiveEvent, updateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const onSetActiveEvent = (event) => {
        dispatch(setActiveEvent(event));
    }

    const startSavingEvent = async(calendarEvent) => {
        if ( calendarEvent._id ) {
            // Update
            dispatch(updateEvent(calendarEvent));
        } else {
            // Create
            const newEvent = { _id: new Date().getTime().toString(),...calendarEvent}
            dispatch(addNewEvent(newEvent));
        }
    }

    return {
        events,
        activeEvent,
        onSetActiveEvent,
        startSavingEvent
    };
}
