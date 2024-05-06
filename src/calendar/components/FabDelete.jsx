import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
    const { hasEventSelected, startDeleteEvent } = useCalendarStore();

    const onClick = () => {
        startDeleteEvent();
    };

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={onClick}
            style={{
                display: hasEventSelected ? "" : "none",
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
