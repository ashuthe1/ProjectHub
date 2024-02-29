import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: null,
    messages: null,
  },
  reducers: {
    setConversationsdata: (state, action) => {
      state.conversations = action.payload;
    },
    setMessagesdata: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setConversationsdata, setMessagesdata } = chatSlice.actions;
export default chatSlice.reducer;

export const selectCurrentConversations = (state) => state.chat.conversations;
export const selectCurrentMessages = (state) => state.chat.messages;
