import GlassDiv from "Shared/GlassDiv"
import React from "react"
import { Line, Pie } from "react-chartjs-2"

const CampaignAnalytics = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Campaign 1",
        data: [1000, 1200, 1500, 1300, 1400, 1600, 1700, 1800, 2000, 2100, 2300, 2400],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Campaign 2",
        data: [800, 900, 1100, 1000, 1050, 1200, 1250, 1300, 1400, 1450, 1500, 1600],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
    ],
  }

  const pieChartData = {
    labels: ["YouTube", "Facebook"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  }

  return (
    <>
      <GlassDiv className="!p-2 flex w-[40%]">
        <Line
          data={lineChartData}
          options={{
            plugins: {
              legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
              title: { display: true, color: "black", font: { weight: 600 } },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Performance Metric", font: { weight: 600 }, color: "black" },
                ticks: { color: "black", font: { weight: 600 } },
              },
              x: {
                title: { display: true, text: "Time (Months)", font: { weight: 600 }, color: "black" },
                ticks: { color: "black", font: { weight: 600 } },
              },
            },
          }}
        />
      </GlassDiv>
      <GlassDiv className="!p-2 flex w-[20%]">
        <Pie data={pieChartData} />
      </GlassDiv>
    </>
  )
}

export default CampaignAnalytics
