import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: null,
    selectedConversation: null,
    messages: null,
  },
  reducers: {
    setConversationsdata: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversationsdata: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessagesdata: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setConversationsdata, setSelectedConversationsdata, setMessagesdata } = chatSlice.actions;
export default chatSlice.reducer;

export const selectConversations = (state) => state.chat.conversations;
export const selectSelectedConversations = (state) => state.chat.selectedConversation;
export const selectCurrentMessages = (state) => state.chat.messages;
