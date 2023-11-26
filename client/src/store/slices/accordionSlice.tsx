import { createSlice } from '@reduxjs/toolkit';

const accordionSlice = createSlice({
  name: 'accordion',
  initialState: {},
  reducers: {
    toggleAccordion: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    closeAllAccordions: (state) => {
        Object.keys(state).forEach((key) => {
          state[key] = false;
        });
      },
  },
});

export const { toggleAccordion, closeAllAccordions } = accordionSlice.actions;
export default accordionSlice.reducer;