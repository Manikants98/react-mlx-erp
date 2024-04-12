import { CircularProgress, Collapse, Divider, FormControlLabel, Switch } from "@mui/material"
import axiosInstance from "Config/axio.config"
import { getAmountByLeadSourceFn, getRevenueThisMonthFn } from "Services/CrmDashboard"
import GlassDiv from "Shared/GlassDiv"
import Loader from "Shared/Loader"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { useQuery } from "react-query"
import { options } from "../Linechaet"
import CreatedDeal from "./CreatedDeal"
import DealByStage from "./DealByStage"
import LostRevenue from "./LostRevenue"
import RevenueByUser from "./RevenueByUser"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Deal() {
  const [amountByLaodStage, setAmountByLoadStage] = useState([])

  const [checked1, setChecked1] = useState(true)
  const handleChange1 = () => {
    setChecked1((prev) => !prev)
  }
  const [checked2, setChecked2] = useState(true)
  const handleChange2 = () => {
    setChecked2((prev) => !prev)
  }
  const [checked3, setChecked3] = useState(true)
  const handleChange3 = () => {
    setChecked3((prev) => !prev)
  }

  const { data: revenueMonthData, isLoading: isLoadingMonthRevenue } = useQuery(["revenueMonthCount"], () =>
    getRevenueThisMonthFn()
  )
  const dealsRevenue = revenueMonthData ? revenueMonthData.data.revenue_month : "0"

  const { data: amountByLeadSource, isLoading: isLoadingAmountLoadSouce } = useQuery(["amountLeadSourceCount"], () =>
    getAmountByLeadSourceFn()
  )

  const amountByLoadSource = amountByLeadSource ? amountByLeadSource.data.amount_by_source : []

  const amountByLaodStageFn = () => {
    axiosInstance.get("user-profile-api/").then((res) => {
      setAmountByLoadStage(res.data.amount_by_stage)
    })
  }

  useEffect(() => {
    amountByLaodStageFn()
  }, [])

  const loadSourceLables = amountByLoadSource?.map((i) => i.lead_source)
  const loadSourceData = amountByLoadSource?.map((i) => i.revenue)

  const amountByLoadSourceGraph = {
    labels: loadSourceLables,
    datasets: [
      {
        label: "AMOUNT BY LEAD SOURCE",
        data: loadSourceData,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const loadStageLables = amountByLaodStage?.map((stage) => stage.stage)

  const loadStageData = amountByLaodStage?.map((stage) => stage.revenue)

  const amountByLoadStageGraph = {
    labels: loadStageLables,
    datasets: [
      {
        label: "AMOUNT BY LEAD STAGE",
        data: loadStageData,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked1} onChange={handleChange1} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked1}>
        <div className="flex gap-4">
          <div className="grid w-1/4 gap-3">
            <GlassDiv className="!p-0">
              <div className="flex justify-between p-3">
                <p className="font-semibold">REVENUE THIS MONTH</p>
              </div>
              <Divider />
              <div className="p-5 text-5xl text-center">
                {isLoadingMonthRevenue ? (
                  <div className="flex items-center justify-center w-full">
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  dealsRevenue || 0
                )}
              </div>
            </GlassDiv>

            <GlassDiv className="!p-0">
              <div className="flex justify-between p-3">
                <p className="font-semibold">DEALS CREATED</p>
              </div>
              <Divider />
              <p className="p-5 text-5xl text-center">
                <CreatedDeal />
              </p>
            </GlassDiv>

            <GlassDiv className="!p-0">
              <div className="flex justify-between p-3">
                <p className="font-semibold">REVENUE LOST</p>
              </div>
              <Divider />
              <p className="p-5 text-5xl text-center">
                <LostRevenue />
              </p>
            </GlassDiv>
          </div>

          <GlassDiv className="w-1/4 !p-0 border">
            <div className="flex justify-between p-3 text-base">
              <p className="font-semibold">REVENUE BY USERS</p>
            </div>
            <Divider />
            <RevenueByUser />
          </GlassDiv>

          <GlassDiv className="w-2/4 !p-0 h-fit">
            <div className="flex justify-between p-3">
              <p className="font-semibold">REVENUE BY USERS</p>
            </div>
            <Divider />
            <div className="p-3">
              <DealByStage />
            </div>
          </GlassDiv>
        </div>
      </Collapse>

      <FormControlLabel
        control={<Switch checked={checked2} onChange={handleChange2} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked2}>
        <GlassDiv className="!p-0">
          <div className="flex justify-between px-3 pt-4 pb-3">
            <p className="font-semibold">AMOUNT BY LEAD SOURCE</p>
          </div>
          <Divider />
          <div className="p-4">
            {isLoadingAmountLoadSouce ? (
              <div className="flex min-h-[300px] justify-center items-center w-full">
                <Loader />
              </div>
            ) : (
              <Bar height="80%" data={amountByLoadSourceGraph} options={options} />
            )}
          </div>
        </GlassDiv>
      </Collapse>

      <FormControlLabel
        control={<Switch checked={checked3} onChange={handleChange3} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked3}>
        <GlassDiv className="!p-0">
          <div className="flex justify-between px-3 pt-4 pb-3">
            <p className="font-semibold">AMOUNT BY STAGE</p>
          </div>
          <Divider />
          <div className="p-4">
            <Bar height="80%" data={amountByLoadStageGraph} options={options} />
          </div>
        </GlassDiv>
      </Collapse>
    </>
  )
}
