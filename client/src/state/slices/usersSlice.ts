import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  createdAt: Date
}

export interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: []
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    }
  }
})

export const { setUsers } = userSlice.actions;

export default userSlice.reducer

