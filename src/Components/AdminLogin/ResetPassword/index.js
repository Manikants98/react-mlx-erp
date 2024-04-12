import { useFormik } from "formik"
import React from "react"
import { toast } from "react-toastify"
import CustomButton from "../../../Shared/CustomButton"
import CustomInput from "../../../Shared/CustomInput"
import GlassDiv from "../../../Shared/GlassDiv"
import axiosInstance from "Config/axio.config"

const ResetPassword = () => {
  const initialValues = {
    password: "",
    new_password: "",
    confirm_password: "",
  }

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values, action) => {
      const reqBody = {
        current_password: values.current_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }
      axiosInstance.post(`/change-user-password-of-bhaaraterp/`, reqBody).then((res) => {
        toast.success(res?.data.message)
        formik.resetForm("")
      })
      action.resetForm()
    },
  })

  return (
    <>
      <div className="flex h-full">
        <GlassDiv className="flex flex-col items-center justify-center w-full">
          <form
            onSubmit={formik.handleSubmit}
            className="z-50 flex flex-col items-center justify-center gap-5 p-10 border border-white border-opacity-30"
          >
            <p className="text-3xl font-semibold text-white mb-7">Change Password</p>

            <CustomInput id="current_password" type="password" label="Current Password" formik={formik} isRequired />

            <CustomInput id="new_password" label="New Password" type="password" formik={formik} isRequired />

            <CustomInput id="confirm_password" label="Confirm Password" type="password" formik={formik} isRequired />

            <CustomButton type="submit" className="w-48 mt-7 !outline-none">
              Change
            </CustomButton>
          </form>
        </GlassDiv>
      </div>
    </>
  )
}

export default ResetPassword
