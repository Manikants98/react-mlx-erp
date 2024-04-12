import axios from "Config/axio.config"

export const loginFn = (reqBody) => {
  try {
    const response = axios.post("user-login-with-password-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
