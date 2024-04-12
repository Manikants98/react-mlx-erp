import axiosInstance from "Config/axio.config"

export const invoiceListFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`invoice-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const compaignsDataFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const invoiceDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`invoice-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`invoice-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`invoice-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateInvoiceStatusFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`invoice-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`invoice-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
