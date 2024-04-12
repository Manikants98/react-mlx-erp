import CanvasJSReact from "@canvasjs/react-charts"
import axiosInstance from "Config/axio.config"
import Loader from "Shared/Loader"
import { useEffect, useState } from "react"
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const DealByStage = () => {
  const [stageCounts, setStageCounts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("user-profile-api/")
      setStageCounts(response?.data?.stage_counts)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const total = stageCounts?.reduce((sum, entry) => sum + entry.count, 0)

  const funnelDataPoints = stageCounts?.map((entry, index) => {
    if (index === "ll") {
      return { ...entry, percentage: 100 }
    } else {
      const percentage = ((entry.count / total) * 100).toFixed(2)
      return { ...entry, percentage }
    }
  })
  const transformedData = stageCounts?.map((item, index) => {
    return {
      y: item?.count,
      label: item?.stage,
      percentage: funnelDataPoints?.[index]?.percentage,
      funnel: item?.stage,
    }
  })

  const options = {
    animationEnabled: true,
    title: {
      text: "",
    },
    backgroundColor: "",
    data: [
      {
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({percentage}%)",
        dataPoints: transformedData,
      },
    ],
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[450px] w-full h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <CanvasJSChart options={options} />
        </div>
      )}
    </>
  )
}

export default DealByStage
