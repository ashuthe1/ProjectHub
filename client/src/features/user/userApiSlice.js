import { apiSlice } from "../../redux/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      providesTags: ["users"],
    }),
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/user/follow/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (args) => {
        const { userId, ...userData } = args;
        return {
          url: `/user/${userId}`,
          method: "PUT",
          body: { ...userData },
        };
      },
      invalidatesTags: ["users"],
    }),
    disableUser: builder.mutation({
      query: (userId) => ({
        url: `/user/disable/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
    subscribeUser: builder.mutation({
      query: () => ({
        url: `/stripe/create-checkout-session`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useFollowUserMutation,
  useUpdateUserMutation,
  useDisableUserMutation,
  useSubscribeUserMutation,
} = userApiSlice;
