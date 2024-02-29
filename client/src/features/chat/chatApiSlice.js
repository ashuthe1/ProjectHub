import { apiSlice } from "../../redux/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/chat",
      providesTags: ["conversations"],
    }),
    getMessages: builder.query({
      query: (conversationId) => `/chat/${conversationId}`,
      providesTags: ["messages"],
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/chat",
        method: "POST",
        body: { ...messageData },
      }),
      invalidatesTags: ["messages"],
    }),
  })
});

export const {
  useGetConversations,
  useGetMessages,
  useSendMessage,
} = chatApiSlice;
