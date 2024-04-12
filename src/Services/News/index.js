import axiosInstance from "Config/axio.config"

export const getNewsFn = (redBody) => {
  try {
    const response = axiosInstance.get("news-announcement-api-of-bhaaraterp/", {
      params: redBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
