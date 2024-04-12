import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import axiosInstance from "Config/axio.config"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
export const options = {
  responsive: true,
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
    x: {
      ticks: {
        color: "black",
        font: {
          weight: 600,
        },
      },
    },
    y: {
      ticks: {
        color: "black",
        font: {
          weight: 600,
        },
      },
    },
  },
}
export function Sale() {
  const [salesInvoiceData, setSalesInvoiceData] = useState([])

  const salesInvoice = () => {
    axiosInstance.get("dashboard_graph/last-12-month-invoice/").then((res) => {
      setSalesInvoiceData(res.data?.data)
    })
  }
  useEffect(() => {
    salesInvoice()
  }, [])
  const labels = salesInvoiceData?.map((label) => label.month)
  const totalAmount = salesInvoiceData?.map((amount) => amount.total)
  const invoices = salesInvoiceData?.map((invoice) => invoice.count)
  const data = {
    labels,
    datasets: [
      {
        label: "Totel Amount",
        data: totalAmount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total Invaice",
        data: invoices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  }

  return <Line options={options} data={data} height={"90%"} />
}
export function Purchase() {
  const [purchase, setPurchase] = useState([])

  const purchaseOrders = () => {
    axiosInstance.get("dashboard_graph/last-12-month-purchase-invoice/").then((res) => {
      setPurchase(res.data?.data)
    })
  }
  useEffect(() => {
    purchaseOrders()
  }, [])
  const labels = purchase?.map((label) => label.month)
  const totalAmount = purchase?.map((amount) => amount.total)
  const invoices = purchase?.map((invoice) => invoice.count)
  const data = {
    labels,
    datasets: [
      {
        label: "Totel Amount",
        data: totalAmount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total Invaice",
        data: invoices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  }

  return <Line options={options} data={data} height={"90%"} />
}
export function SaleOrder() {
  const [orders, setOrders] = useState([])

  const salesOrders = () => {
    axiosInstance.get("dashboard_graph/last-12-sales-order/").then((res) => {
      setOrders(res.data?.data)
    })
  }
  useEffect(() => {
    salesOrders()
  }, [])
  const labels = orders?.map((label) => label.month)
  const totalAmount = orders?.map((amount) => amount.total)
  const invoices = orders?.map((invoice) => invoice.count)
  const data = {
    labels,
    datasets: [
      {
        label: "Totel Amount",
        data: totalAmount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total Invaice",
        data: invoices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  }
  return <Line options={options} data={data} height={"90%"} />
}
