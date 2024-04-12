import { Close } from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem"
import { CountryStateCitySelect } from "Helpers"
import { industryList, leadSorceList, ratinglist } from "Mock"
import { createLeadFn, leadDetailsFn, leadsPocDataFn, updateLeadFn } from "Services/CRM/Lead"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import GlassDiv from "Shared/GlassDiv"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageLead = () => {
  const { manage } = useParams()
  const { state: lead_id } = useLocation()
  const isUpdate = manage === "update"

  const { data } = useQuery(["lead"], () => leadDetailsFn({ lead_id }), { enabled: isUpdate })

  const lead = data?.data?.data

  const navigate = useNavigate()

  const { mutate: createLead, isLoading: isAdding } = useMutation(createLeadFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const { mutate: updateLead, isLoading: isUpdating } = useMutation(updateLeadFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const initialValues = {
    leads_pic: "",
    name: lead?.name || "",
    company: lead?.company || "",
    mobile: lead?.mobile || "",
    lead_source: lead?.lead_source || "",
    lead_status: lead?.lead_status || "",
    industry: lead?.industry || "",
    rating: lead?.rating || "",
    annual_revenue: lead?.annual_revenue || "",
    email: lead?.email || "",
    website: lead?.website || "",
    skype: lead?.skype || "",
    twitter: lead?.twitter || "",
    area: lead?.area || "",
    state_id: lead?.state || "",
    country_id: lead?.country || "",
    city_id: lead?.city || "",
    pincode: lead?.pincode || "",
    description: lead?.description || "",
    front_poc_id: lead?.front_poc || "",
    back_poc_id: lead?.back_poc || "",
    gst_no: lead?.gst_no || "",
  }
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const formData = new FormData()
      !isUpdate && formData.append("leads_pic", formik.values.leads_pic)
      isUpdate && formData.append("lead_id", lead_id)
      formData.append("name", formik.values.name)
      formData.append("company", formik.values.company)
      formData.append("mobile", formik.values.mobile)
      formData.append("lead_source", formik.values.lead_source)
      formData.append("lead_status", "Contacted")
      formData.append("industry", formik.values.industry)
      formData.append("rating", formik.values.rating)
      formData.append("annual_revenue", formik.values.annual_revenue)
      formData.append("email", formik.values.email)
      formData.append("website", formik.values.website)
      formData.append("skype", formik.values.skype)
      formData.append("twitter", formik.values.twitter)
      formData.append("area", formik.values.area)
      formData.append("state_id", formik.values.state_id)
      formData.append("country_id", formik.values.country_id)
      formData.append("city_id", formik.values.city_id)
      formData.append("pincode", formik.values.pincode)
      formData.append("description", formik.values.description)
      formData.append("front_poc_id", formik.values.front_poc_id)
      formData.append("back_poc_id", formik.values.back_poc_id)
      formData.append("gst_no", formik.values.gst_no)
      isUpdate ? updateLead(formData) : createLead(formData)
    },
  })

  const { data: leadsPocData } = useQuery(["leadsPocData"], () => leadsPocDataFn())

  const frontPOCs = leadsPocData?.data?.data
  const backPOCs = leadsPocData?.data?.data

  return (
    <>
      <GlassDiv className="w-full !p-0">
        <GlassDiv className="flex items-center justify-between rounded-b-none !p-1">
          <p className="text-lg font-semibold">Lead</p>
          <CustomIconButton onClick={() => navigate(-1)}>
            <Close />
          </CustomIconButton>
        </GlassDiv>
        <form onSubmit={formik.handleSubmit} className="w-full h-auto p-2">
          <GlassDiv className="flex flex-col gap-1 lg:w-1/2">
            <p className="text-[#432CCD] text-lg">Lead Image </p>
            <span className="flex items-center gap-2">
              <CustomButton
                size="small"
                component="label"
                className="bg-gradient-to-r from-purple-600 to-pink-300 !rounded !text-white"
              >
                Choose File
                <input
                  type="file"
                  hidden
                  id="leads_pic"
                  accept="image/png, image/jpeg"
                  name="leads_pic"
                  onChange={(event) => formik.setFieldValue("leads_pic", event.target.files[0])}
                />
              </CustomButton>
              <p className="overflow-x-hidden text-ellipsis whitespace-nowrap w-52">
                {formik.values.leads_pic?.name ? formik.values.leads_pic?.name : "No File Choosen"}
              </p>
            </span>
          </GlassDiv>

          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 md:grid-cols-2">
              <CustomInput id="name" formik={formik} placeholder="Enter Name" label=" Name" />

              <CustomInput id="email" type="email" formik={formik} label="Email" placeholder="Enter Your Email" />

              {localStorage.getItem("role") === "Admin" && (
                <>
                  <CustomSelect id="front_poc_id" formik={formik} label="Front POC" placeholder="Select Front POC">
                    {frontPOCs?.map((poc) => (
                      <MenuItem key={poc?.id} value={poc?.id}>
                        {poc.name}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  <CustomSelect id="back_poc_id" formik={formik} label="Back POC" placeholder="Select Back POC">
                    {backPOCs?.map((poc) => (
                      <MenuItem key={poc?.id} value={poc?.id}>
                        {poc.name}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </>
              )}

              <CustomInput id="mobile" formik={formik} label="Mobile" type="number" placeholder="Enter Mobile" />

              <CustomInput id="gst_no" formik={formik} label="GST Number" placeholder="Enter GST Number" />

              <CustomInput id="website" label="Website" placeholder="Enter Website URL" formik={formik} />

              <CustomInput id="company" formik={formik} label="Company" placeholder="Enter Company Name" />

              <CustomSelect
                id="lead_source"
                formik={formik}
                label="Lead Source"
                options={leadSorceList}
                placeholder="Select Lead Source"
              />

              <CustomSelect
                id="industry"
                formik={formik}
                label="Industry"
                options={industryList}
                placeholder="Select Industry"
              />

              <CustomInput
                id="annual_revenue"
                formik={formik}
                label="Annual Revenue"
                placeholder="Enter Annual Revenue"
              />

              <CustomSelect
                id="rating"
                formik={formik}
                label="Rating"
                options={ratinglist}
                placeholder="Select Rating"
              />

              <CustomInput id="skype" formik={formik} label="Skype" placeholder="Enter Skype" />

              <CountryStateCitySelect formik={formik} />

              <CustomInput id="area" formik={formik} label="Area" placeholder="Enter Area" />

              <CustomInput id="pincode" formik={formik} label="Pincode" placeholder="Enter Pincode" />

              <CustomInput id="twitter" formik={formik} label="Twitter" placeholder="Twitter" />
            </div>

            <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Description.." />

            <div className="flex items-center justify-end gap-4">
              <CustomButton
                isLoading={isAdding || isUpdating}
                variant="contained"
                className="!p-2 !px-10"
                type="submit"
              >
                Save
              </CustomButton>
              <CustomButton variant="contained" className="!p-2 !px-10" onClick={() => navigate(-1)}>
                Cancel
              </CustomButton>
            </div>
          </div>
        </form>
      </GlassDiv>
    </>
  )
}

export default ManageLead
