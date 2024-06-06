import { API } from "../base";
import { getTokenFromLocalStorage } from "../records";
export interface User {
  id: string;
  email: string;
  avatar: string;
  name: string;
}
export interface UserSignInInfo {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
export interface UserLoginInfo {
  email: string;
  password: string;
}
export interface UserUpdateInfo {
  name: string,
  email: string,
  avatar: string
}
const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    signInUser: build.mutation<any, {body: UserSignInInfo}>({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: JSON.stringify(data.body)
      }),
    }),
    loginUser: build.mutation<{token: string}, {body: UserLoginInfo}>({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: JSON.stringify(data.body)
      }),
    }),
    updateUser: build.mutation<void, {id: string, body: UserUpdateInfo}>({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data.body)
      }),
      invalidatesTags: ['User']
    }),
    getUser: build.query<User[], void>({
      query: () => ({
        url: 'users',
      }),
      providesTags: ['User']
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetUserQuery,
  useSignInUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation
} = userApi;
