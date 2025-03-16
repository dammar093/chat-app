import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessage {
  _id: string;
  file?: string;
  message?: string;
  sender: {
    email: string;
    profilePic: string;
    _id: string;
    name: string
  },
  reciever: {
    email: string;
    profilePic: string;
    _id: string;
    name: string
  },
  createdAt: Date
}

export interface MessageState {
  messages: IMessage[]
}

const initialState: MessageState = {
  messages: []
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload)
    },
  }
})

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer