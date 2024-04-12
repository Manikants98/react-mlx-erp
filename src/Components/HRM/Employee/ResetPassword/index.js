import { useFormik } from "formik"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import CustomButton from "Shared/CustomButton"
import CustomModal from "../../../../Shared/CustomModal"
import CustomInput from "Shared/CustomInput"
import { resetPasswordFn } from "../../../../Services/HrmApi/ResetPassword"
import { useMutation } from "react-query"

const ResetPassword = ({ id, className }) => {
  const [open, setOpen] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const [conPass, setConPass] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  console.log(id, "id")
  const { mutate, isLoading } = useMutation(resetPasswordFn, {
    onSuccess: (response) => {
      if (response?.data.response_code === 200) {
        handleClose()
        toast.success(response.data.message)
        formik.resetForm("")
      } else {
        toast.error(response.data.message)
      }
    },
    onError: (error) => {
      toast.error(error?.message ? error?.message : error?.msg)
    },
  })

  const initialValues = {
    new_password: "",
    confirm_password: "",
  }

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      const reqBody = {
        employee_id: id,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }
      mutate(reqBody)
      // axiosInstance.post(API_URLS.hrm.resetPassword, reqBody).then((res) => {
      //   toast.success(res.data.message);
      //   if (res?.data.response_code === 200) {
      //     handleClose();
      //     formik.resetForm("");
      //   }
      // });
    },
  })

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const togglePassword1 = () => {
    setConPass(!conPass)
  }

  return (
    <>
      <CustomButton className={className ? className : ""} onClick={handleOpen}>
        Reset
      </CustomButton>

      <CustomModal open={open} onClose={handleClose} setOpen={setOpen} className="!w-[530px]" title="Reset Password">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <div className="gap-7">
            <CustomInput
              formik={formik}
              id="new_password"
              name="new_password"
              value={formik.values["new_password"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-[460px]"
              type={passwordShown ? "text" : "password"}
              label="New Password *"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {passwordShown === true ? (
                      <VisibilityOff onClick={togglePassword} className="!cursor-pointer" />
                    ) : (
                      <Visibility onClick={togglePassword} className="!cursor-pointer" />
                    )}
                  </InputAdornment>
                ),
                className: "!border-none",
              }}
            />
            <CustomInput
              formik={formik}
              id="confirm_password"
              name="confirm_password"
              value={formik.values["confirm_password"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-[460px]"
              type={conPass ? "text" : "password"}
              label="Confirm Password *"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {conPass === true ? (
                      <VisibilityOff onClick={togglePassword1} className="!cursor-pointer" />
                    ) : (
                      <Visibility onClick={togglePassword1} className="!cursor-pointer" />
                    )}
                  </InputAdornment>
                ),
                className: "!border-none",
              }}
            />
          </div>
          <CustomButton isLoading={isLoading} type="submit" className="!mt-5 !w-full !flex !justify-center !mx-auto">
            reset
          </CustomButton>
        </form>
      </CustomModal>
    </>
  )
}

export default ResetPassword
