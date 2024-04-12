import GlassDiv from "Shared/GlassDiv"
import { Line, Pie } from "react-chartjs-2"

const LeadQualification = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Unqualified",
        data: [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Needs Nurturing",
        data: [5, 8, 12, 10, 15, 20, 18, 22, 28, 25, 30, 35],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Qualified",
        data: [3, 6, 8, 7, 10, 12, 15, 18, 20, 22, 25, 28],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  }

  const pieChartData = {
    labels: ["Unqualified", "Needs Nurturing", "Qualified"],
    datasets: [
      {
        data: [20, 30, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }

  return (
    <div className="flex gap-2">
      <GlassDiv className="flex !p-2 w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
      <GlassDiv className="flex !p-2 w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
      <GlassDiv className="flex !p-2 w-[50%]">
        <Line
          data={lineChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
              title: {
                display: true,
                color: "black",
                font: {
                  weight: 600,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Leads",
                  font: { weight: 600 },
                  color: "black",
                },
                ticks: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Time (Months)",
                  font: { weight: 600 },
                  color: "black",
                },
                ticks: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
    </div>
  )
}

export default LeadQualification
