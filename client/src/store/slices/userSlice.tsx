import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  sessionId: number | null;
  email: string | null;
}

const initialState: UserState = {
  sessionId: null,
  email: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedIn(
      state,
      action: PayloadAction<{ sessionId: number; email: string }>
    ) {
      state.sessionId = action.payload.sessionId;
      state.email = action.payload.email;
    },
    userLoggedOut(state) {
      state = {
        sessionId: null,
        email: null
      };
    }
  }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
