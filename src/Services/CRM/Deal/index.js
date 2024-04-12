import axiosInstance from "Config/axio.config"

export const dealListFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/deal-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const dealDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/deal-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const campaignMediaFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-media-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignMembersFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addDealFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/deal-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateDealFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/deal-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteDealFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`crm/deal-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
