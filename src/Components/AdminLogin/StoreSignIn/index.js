import logo from "Resources/opraah-logo.png"
import { logInSchema } from "Schemas"
import { loginFn } from "Services/Login"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const handleSetLocalStorage = (res) => {
  localStorage.setItem("token", res?.token)
  localStorage.setItem("role", res?.role)
  localStorage.setItem("name", res?.name)
  localStorage.setItem("logo", res?.logo)
}

const StoreSignIn = () => {
  const navigate = useNavigate()

  const { mutate: logIn } = useMutation(loginFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      handleSetLocalStorage(data)
      navigate("/dashboard")
    },
  })

  const initialValues = { username: "", password: "" }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: logInSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const reqBody = { username: values.username, password: values.password }
      logIn(reqBody)
    },
  })

  const isLogined = Boolean(localStorage.getItem("token"))

  useEffect(() => {
    isLogined && navigate("/dashboard")
  }, [isLogined])

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 bg-gray-50">
      <div className="flex flex-col items-center gap-5 p-12 bg-white rounded-lg shadow-lg">
        <img src={logo} alt="" className="w-72" />
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <p className="text-xl font-semibold text-center">Welcome Back</p>
          <CustomInput
            id="username"
            label="Email Or Mobile Number"
            formik={formik}
            className="w-96"
            placeholder="mkx@aaratechnologies.in"
          />

          <div className="flex flex-col">
            <CustomInput
              type="password"
              label="Password"
              id="password"
              className="w-96"
              formik={formik}
              placeholder="•••••••••••••••"
            />
          </div>

          <CustomButton type="submit" className="!bg-gradient-to-r !text-white w-full !from-[#EE395A] !to-[#3BB273]">
            Login
          </CustomButton>
        </form>
      </div>
    </div>
  )
}

export default StoreSignIn
