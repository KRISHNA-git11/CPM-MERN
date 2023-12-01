import { apiSlice } from "./apiSlice";
const BIDS_URL = '/api/bids';

export const bidApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBid: builder.mutation({
            query: (data) => ({
                url: `${BIDS_URL}/createBid`,
                method: 'POST',
                body: data,
            })
        }),
        getAllBids: builder.query({
            query: () => ({
              url: `${BIDS_URL}/activeBids`, 
              method: 'GET',
            }),
        }),
        getBidByTitle: builder.query({
            query: (id) => ({
                url: `${BIDS_URL}/bid/${id}`,
                method: 'GET',
            })
        })
    })
})

export const {
    useCreateBidMutation,
    useGetAllBidsQuery,
    useGetBidByTitleQuery,
} = bidApiSlice;