import { apiSlice } from "../../redux/apiSlice";
import { logOut, setEmail, setOtp, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    googleAuthUrl: builder.mutation({
      query: () => ({
        url: "/auth/generateGoogleAuthUrl",
        method: "POST",
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sendOtp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verifyOtp1",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useGoogleAuthUrlMutation,
  useSignUpMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
