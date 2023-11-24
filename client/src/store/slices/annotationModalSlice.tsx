import { createSlice } from '@reduxjs/toolkit';

export const annotationModalSlice = createSlice({
  name: 'annotationModal',
  initialState: {
    isOpened: false,
  },
  reducers: {
    openAnnotationModal: (state) => {
      state.isOpened = true;
    },
    closeAnnotationModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openAnnotationModal, closeAnnotationModal } = annotationModalSlice.actions;

export default annotationModalSlice.reducer;