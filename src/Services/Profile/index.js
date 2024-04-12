import axiosInstance from "Config/axio.config"

export const storeProfileFn = (reqBody) => {
  try {
    const response = axiosInstance.get("user-profile-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updateProfileFn = (reqBody) => {
  try {
    const response = axiosInstance.post("user-profile-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
