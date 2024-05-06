import { useDispatch, useSelector } from "react-redux";
import { setActiveEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const onSetActiveEvent = (event) => {
        dispatch(setActiveEvent(event));
    }

    return {
        events,
        activeEvent,
        onSetActiveEvent
    };
}
