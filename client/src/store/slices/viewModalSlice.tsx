import { createSlice } from '@reduxjs/toolkit';

export const viewModalSlice = createSlice({
  name: 'viewModal',
  initialState: {
    isOpened: false,
  },
  reducers: {
    openViewModal: (state) => {
        console.log(state)
      state.isOpened = true;
    },
    closeViewModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openViewModal, closeViewModal } = viewModalSlice.actions;

export default viewModalSlice.reducer;