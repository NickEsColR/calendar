import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
    const { openNewEventModal } = useUiStore();
    const {onSetActiveEvent} = useCalendarStore()

    const onClick = () => {
        onSetActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 1),
            bgColor: "#fafafa",
            user: {
                _id: "123",
                name: "Fernando",
            }
        });
        openNewEventModal();
    };

    return (
        <button className="btn btn-primary fab" onClick={onClick}>
            <i className="fas fa-plus"></i>
        </button>
    );
};
