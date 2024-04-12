import { Close } from "@mui/icons-material"
import { CountryStateCitySelect } from "Helpers"
import { addMembersFn, membersDetailFn, updateMembersFn } from "Services/CRM/Members"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import GlassDiv from "Shared/GlassDiv"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageMembers = () => {
  const { manage } = useParams()
  const { state: campaign_member_id } = useLocation()

  const isUpdate = manage === "update"

  const { data: membersData } = useQuery(
    ["member", campaign_member_id],
    () => membersDetailFn({ campaign_member_id }),
    { enabled: isUpdate }
  )

  const member = membersData?.data?.data

  const navigate = useNavigate()

  const { mutate: addMembers, isLoading: isAdding } = useMutation(addMembersFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const { mutate: updateMembers, isLoading: isUpdating } = useMutation(updateMembersFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const initialValues = {
    name: member?.name || "",
    mobile: member?.mobile || "",
    email: member?.email || "",
    pincode: member?.pincode || "",
    area: member?.area || "",
    city_id: member?.city || "",
    state_id: member?.state || "",
    country_id: member?.country || "",
    gst_no: member?.gst_no || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      isUpdate ? updateMembers({ campaign_member_id, ...formik.values }) : addMembers(formik.values)
    },
  })

  return (
    <GlassDiv className="w-full !p-0">
      <GlassDiv className="flex items-center justify-between rounded-b-none !p-1">
        <p className="text-lg font-semibold">Creators</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </GlassDiv>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Creator Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CustomInput id="name" formik={formik} placeholder="Enter Name" label="Name" />
          <CustomInput id="mobile" formik={formik} placeholder="Enter Mobile" label="Mobile" />
          <CustomInput id="email" formik={formik} placeholder="Enter Email" label="Email" />
          <CustomInput id="pincode" formik={formik} placeholder="Enter Pincode" label="Pincode" />
          <CustomInput id="area" formik={formik} placeholder="Enter Area" label="Area" />
          <CustomInput id="gst_no" formik={formik} placeholder="Enter GST Number" label="GST Number" />
          <CountryStateCitySelect formik={formik} />
        </div>
        <div className="flex justify-end gap-4 py-2">
          <CustomButton variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </CustomButton>
          <CustomButton isLoading={isAdding || isUpdating} type="submit">
            Save
          </CustomButton>
        </div>
      </form>
    </GlassDiv>
  )
}

export default ManageMembers
