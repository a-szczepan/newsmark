import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  email: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<{ id: string; email: string }>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    userLoggedOut(state) {
      state = {
        id: null,
        email: null
      };
    }
  }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
