import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Ioniline {
  id: string
}

export interface OnlineState {
  online: Ioniline[]
}

const initialState: OnlineState = {
  online: []
}

const onlineSlice = createSlice({
  name: "online",
  initialState,
  reducers: {
    setOnline: (state, action: PayloadAction<Ioniline[]>) => {
      state.online = action.payload
    }
  }
})
export const { setOnline } = onlineSlice.actions;

export default onlineSlice.reducer