import axiosInstance from "Config/axio.config"

export const leadsReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const closuresReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-closure-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const lostLeadsReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-lost-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
