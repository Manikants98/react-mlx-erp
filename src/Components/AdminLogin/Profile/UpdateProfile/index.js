import { Avatar, Divider, MenuItem } from "@mui/material"
import axiosInstance from "Config/axio.config"
import { useCountry, useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import GlassDiv from "Shared/GlassDiv"
import Loader from "Shared/Loader"
import { useFormik } from "formik"
import { toast } from "react-toastify"

const UpdateProfile = () => {
  const { profile, isLoading } = useProfile()
  const initialValues = {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    dob: profile?.dob || "",
    area: profile?.area || "",
    state: profile?.state || "",
    city: profile?.city || "",
    pin_code: profile?.pin_code || "",
    adhaar: profile?.adhaar || "",
    facebook: profile?.facebook_link || "https://www.facebook.com/",
    twitter: profile?.twitter_link || "https://www.twitter.com/",
    instagram: profile?.instagram_link || "https://www.instagram.com/",
    marital_status: profile?.marital_status || "",
    gender: profile?.gender || "",
    profile_pic: "",
  }
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = new FormData(document.getElementById("profile-form"))
      axiosInstance.patch("user-profile-api/", reqbody).then((response) => {
        if (response.data.response_code === 200) {
          toast.success(response.data.message)
        } else {
          toast.success(response.data.message)
        }
      })
    },
  })
  const { states, cities } = useCountry({ country_id: profile?.country, state_id: formik.values.state })

  return isLoading ? (
    <GlassDiv className="flex items-center justify-center w-full h-full">
      <Loader />
    </GlassDiv>
  ) : (
    <>
      <GlassDiv className="flex flex-col !p-0 w-full">
        <p className="p-3 text-xl font-semibold text-center">Update Profile</p>
        <Divider />
        <form id="profile-form" onSubmit={formik.handleSubmit}>
          <span className="grid grid-cols-4 gap-5 p-8">
            <CustomButton
              startIcon={
                <Avatar
                  src={
                    formik.values.profile_pic ? URL?.createObjectURL(formik.values.profile_pic) : profile?.profile_pic
                  }
                  alt={formik.values.first_name}
                  className="h-16 rounded"
                />
              }
              component="label"
              className="!flex !justify-start"
            >
              <input
                id="profile_pic"
                type="file"
                name="profile_pic"
                hidden
                onChange={(event) => formik.setFieldValue("profile_pic", event.target.files[0])}
              />
              {formik.values.profile_pic?.name
                ? formik.values.profile_pic?.name?.length > 26
                  ? formik.values.profile_pic?.name?.slice(0, 26) + "..."
                  : formik.values.profile_pic?.name
                : "Choose Profile Picture"}
            </CustomButton>
            <CustomInput label="First Name" id="first_name" formik={formik} placeholder="Enter First Name" />
            <CustomInput label="Last Name" id="last_name" formik={formik} placeholder="Enter Last Name" />
            <CustomInput label="DOB" type="date" id="dob" formik={formik} />
            <CustomSelect id="gender" label="Gender" formik={formik} placeholder="Select Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </CustomSelect>

            <CustomInput
              label="Aadhar Card Number"
              id="adhaar"
              type="number"
              formik={formik}
              placeholder="Enter Aadhar Card Number"
            />

            <CustomInput label="Area" id="area" placeholder="Enter Area" formik={formik} />
            <CustomInput label="Pincode" id="pin_code" isRequired placeholder="Enter Pincode" formik={formik} />
            <CustomSelect
              id="state"
              label="State"
              isRequired
              formik={formik}
              options={states}
              placeholder="Select State"
            />
            <CustomSelect
              id="city"
              label="City"
              isRequired
              placeholder="Select City"
              options={cities}
              formik={formik}
            />
            <CustomInput label="Facebook url" id="facebook" placeholder="Facebook url" formik={formik} />

            <CustomInput label="Instagram url" id="instagram" formik={formik} placeholder="Instagram url" />
            <CustomInput label="Twitter Url" id="twitter" formik={formik} placeholder="Twitter url" />
            <CustomSelect
              id="marital_status"
              label="Marrital Status"
              placeholder="Select Marrital Status"
              formik={formik}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </CustomSelect>
          </span>

          <span className="flex justify-end px-8 pb-5">
            <CustomButton type="submit" className="!px-8 !bg-opacity-100 !bg-red-500 rounded">
              update profile
            </CustomButton>
          </span>
        </form>
      </GlassDiv>
    </>
  )
}

export default UpdateProfile
