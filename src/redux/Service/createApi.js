import { creatApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = creatApi({
    reducerPath: `userApi`,
    baseQuery: fetchBaseQuery({})
})