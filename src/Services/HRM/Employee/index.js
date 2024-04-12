import axiosInstance from "Config/axio.config"
const url = `hrm/employee-api/`
const urlDetail = `hrm/employee-details-api/`

export const employeeFn = (reqbody) => {
  try {
    const response = axiosInstance.get(url, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const employeeDetailFn = (reqbody) => {
  try {
    const response = axiosInstance.get(urlDetail, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const deleteEmployeeFn = (reqbody) => {
  try {
    const response = axiosInstance.delete(url, { data: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const addEmployeeFn = (redBody) => {
  try {
    const response = axiosInstance.post(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const updateEmployeeFn = (redBody) => {
  try {
    const response = axiosInstance.put(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
