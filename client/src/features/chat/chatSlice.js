import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: null,
    messages: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setConversations, setMessages } = chatSlice.actions;
export default chatSlice.reducer;

export const selectCurrentConversations = (state) => state.chat.conversations;
export const selectCurrentMessages = (state) => state.chat.messages;
