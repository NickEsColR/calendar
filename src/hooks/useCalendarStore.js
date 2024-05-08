import { useDispatch, useSelector } from "react-redux";
import { addNewEvent, deleteEvent, setActiveEvent, updateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

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
            const newEvent = { _id: data.event._id, ...calendarEvent, user}
            dispatch(addNewEvent(newEvent));
        }
    }

    const startLoadingEvents = async() => {
        try{
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            console.log(events)

        }catch(error){
            console.log(error);
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
        startLoadingEvents,
        startDeleteEvent
    };
}
