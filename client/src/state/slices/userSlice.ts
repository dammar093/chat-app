import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  name: string;
  profilePic: string;
  email: string;
}

const initialState: UserState | null = {
  _id: '',
  name: '',
  profilePic: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.profilePic = action.payload?.profilePic;
      state.email = action.payload?.email;
    },
    clearUser(state) {
      state._id = '';
      state.name = '';
      state.profilePic = '';
      state.email = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;