import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userApi = createApi({
    reducerPath: `api`,
    baseQuery: fetchBaseQuery({ baseUrl: "localhost:3000" }),

    endpoints: (builder) => ({
        login: builder.query({
            query: () => 'login',

        }),
    }),

})

export const { useGetUserInfoQuery } = userApi;