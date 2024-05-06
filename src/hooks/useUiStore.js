import { useDispatch, useSelector } from "react-redux";
import { onCloseNewEventModal, onOpenNewEventModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isNewEventModalOpen } = useSelector((state) => state.ui);

    const openNewEventModal = () => {
        dispatch(onOpenNewEventModal());
    };

    const closeNewEventModal = () => {
        dispatch(onCloseNewEventModal());
    }

    return {
        isNewEventModalOpen,
        openNewEventModal,
        closeNewEventModal
    };
};
