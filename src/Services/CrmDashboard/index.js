import axiosInstance from "Config/axio.config"

export const LeadByStageCountFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/leads-by-stage/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const LeadByIndustriesCountFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/leads-by-industry/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const getTop10LeadSourceFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getLeadCountFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getTop10LeadOwnerFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getJunkLeadSourceFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getRevenueThisMonthFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const getDealCreateFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getRevenueLostFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getRevenueByUserFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getAmountByLeadSourceFn = () => {
  try {
    const response = axiosInstance.get("dashboard_graph/top-10-lead-source/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
