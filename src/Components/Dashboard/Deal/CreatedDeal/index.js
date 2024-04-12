import React from "react"
import { CircularProgress } from "@mui/material"
import { useQuery } from "react-query"
import { getDealCreateFn } from "../../../../Services/CrmDashboard"

const CreatedDeal = () => {
  const { data, isLoading } = useQuery(["dealCreatCount"], () => getDealCreateFn(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const count = data ? data.data.data : "0"
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

export default CreatedDeal
