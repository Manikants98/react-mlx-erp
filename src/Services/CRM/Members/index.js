import axiosInstance from "Config/axio.config"

export const membersFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const membersDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addMembersFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/campaign-member-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateMembersFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`crm/campaign-member-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteMembersFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`crm/campaign-member-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
