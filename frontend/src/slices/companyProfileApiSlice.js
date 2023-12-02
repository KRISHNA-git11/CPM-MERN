import { apiSlice } from "./apiSlice";
const COMPANY_URL = "/api/companyProfile"
const EMPLOYEE_URL = "/api/companyEmployee"

export const companyProfileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: (title) => ({
                url: `${COMPANY_URL}/${title}`,
                method: 'GET',
            })
        }),
        getComapnyEmployees : builder.query({
            query:(id) => ({
                url: `${EMPLOYEE_URL}/getEmployees/${id}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useGetCompanyQuery,
    useGetComapnyEmployeesQuery
} = companyProfileApiSlice;