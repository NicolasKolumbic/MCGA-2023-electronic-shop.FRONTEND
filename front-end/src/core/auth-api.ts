import { User } from '@/models/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<string, User>({
            query: (user: User) => {

                return {
                    url: '/auth',
                    method: 'POST',     
                    body: {
                        email: user.email,
                        password: user.password
                    },
                    credentials: 'include'
                }
            }
        }),
        logout: builder.mutation({
            query: () => {

                return {
                    url: '/logout',
                    method: 'POST',
                    credentials: 'include'
                }
            }
        })
    }),
});

export const { useLoginMutation, useLogoutMutation} = authApi;