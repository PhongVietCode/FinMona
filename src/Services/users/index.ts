import {API } from "../base";
export interface User {
  id: string,
  email: string, 
  avatar: string,
  username: string
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
const userApi = API.injectEndpoints({
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
    getAllUser: build.query<User, void>({
      query: () => 'users'
    })
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery, useLazyGetAllUserQuery } = userApi;
