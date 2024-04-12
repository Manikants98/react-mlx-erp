import React from "react"
import { Skeleton } from "@mui/material"
import { useQuery } from "react-query"
import { getRevenueByUserFn } from "../../../../Services/CrmDashboard"
import GlassDiv from "Shared/GlassDiv"

const RevenueByUser = () => {
  const { data, isLoading } = useQuery(["revenueByUserCount"], () => getRevenueByUserFn(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const count = data ? data.data.revenue_user : [0]
  return (
    <div className="flex flex-col gap-2 p-2">
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8]?.map(() => {
            return (
              <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                <Skeleton className="w-full" />
              </GlassDiv>
            )
          })
        : count?.map((user) => {
            return (
              <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                <p>
                  {user.deal_owner__first_name} {user.deal_owner__last_name}
                </p>
                <p>{user.revenue}</p>
              </GlassDiv>
            )
          })}
    </div>
  )
}

export default RevenueByUser
