import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
    const {user} = useAuthStore();
    const { openNewEventModal } = useUiStore();
    const { events, onSetActiveEvent,startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week"
    );

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ? "#347cf7": "#505050",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };
        return {
            style,
        };
    };

    const onDoubleClick = (e) => {
        openNewEventModal();
    };

    const onSelectEvent = (e) => {
        onSetActiveEvent(e);
    };

    const onViewChanged = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor={"start"}
                endAccessor={"end"}
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    );
};
