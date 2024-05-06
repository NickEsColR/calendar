import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewEventModalOpen: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        onOpenNewEventModal: (state) => {
            state.isNewEventModalOpen = true;
        },
        onCloseNewEventModal: (state) => {
            state.isNewEventModalOpen = false;
        },
    },
});

export const { onOpenNewEventModal, onCloseNewEventModal } = uiSlice.actions;
