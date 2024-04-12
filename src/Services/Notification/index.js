import axios from "Config/axio.config"

export const NotifictaionFn = (redBody) => {
  try {
    const response = axios.get("notification-api/", {
      params: redBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const addNotifictaionFn = (redBody) => {
  try {
    const response = axios.post("notification-api/", redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updateNotifictaionFn = (redBody) => {
  try {
    const response = axios.put("notification-api/", redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const changeConfigStatusFn = (redBody) => {
  try {
    const response = axios.post("notification-api/", redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const notifictaionListFn = (redBody) => {
  try {
    const response = axios.get("notification-api/", {
      params: redBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
