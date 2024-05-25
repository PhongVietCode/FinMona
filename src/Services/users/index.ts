import { user_api as user_api } from "../base";
export interface User {
  id: string,
  name: string,
  email: string, 
  avatar: string,
}
export interface UserSignInInfo {
  name: string,
  email: string,
  password: string,
  avatar: string
}
export interface UserLoginInfo{
  email: string, 
  password: string,
}

// const saveTokenInfo = (token) => {
//   token = 1 // save token to local storage
//   return 1
// }
const userApi = user_api.injectEndpoints({
  endpoints: (build) => ({
    postUser: build.query<UserSignInInfo, {statusCode: number, message: string}>({
      query: () => 'users'
    }),
    postUserLogin: build.query<UserLoginInfo, string>({
      query: () => 'users/login'
    }),
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery } = userApi;
