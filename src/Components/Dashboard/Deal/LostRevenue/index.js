import { CircularProgress } from "@mui/material"
import React from "react"
import { useQuery } from "react-query"
import { getRevenueLostFn } from "../../../../Services/CrmDashboard"

const LostRevenue = () => {
  const { data, isLoading } = useQuery(["lostRevenueList"], () => getRevenueLostFn(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const count = data?.data?.revenue_lost ? data.data.revenue_lost : "0"

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>{count}</div>
      )}
    </>
  )
}

export default LostRevenue
