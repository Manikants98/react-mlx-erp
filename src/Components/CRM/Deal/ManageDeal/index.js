import { Close } from "@mui/icons-material"
import { MenuItem } from "@mui/material"
import { CreatorSelect, LeadSelect } from "Helpers"
import { addDealFn, campaignMediaFn, dealDetailFn, updateDealFn } from "Services/CRM/Deal"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import GlassDiv from "Shared/GlassDiv"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageDeal = () => {
  const [inputs, setInputs] = useState([])
  const { manage } = useParams()
  const { state: deal_id } = useLocation()
  const isUpdate = manage === "update"

  const { data: deals } = useQuery(["deal", deal_id], () => dealDetailFn({ deal_id }))

  const deal = deals?.data?.data

  const navigate = useNavigate()

  const { mutate: addDeal, isLoading: isAdding } = useMutation(addDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const { mutate: updateDeal, isLoading: isUpdating } = useMutation(updateDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const initialValues = {
    lead_id: deal?.lead || "",
    deal_amount: deal?.deal_amount || "",
    advance_amount: deal?.advance_amount || 0,
    after_campaign_amount: deal?.after_campaign_amount || 100,
    campaign_type: deal?.campaign?.campaign_type || "",
    campaign_title: deal?.campaign?.campaign_title || "",
    description: deal?.description || "",
    start_date: moment(deal?.start_date).format("YYYY-MM-DD") || "",
    end_date: moment(deal?.end_date).format("YYYY-MM-DD") || "",
    campaign_data: deal?.campaign_data || "",
    campaign_member_id: deal?.campaign?.campaign_member || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        ...formik.values,
        campaign_data: formik.values.campaign_type === "Video" ? inputs : formik.values.campaign_data,
        advance_payment: formik.values.advance_amount ? true : false,
        after_campaign_payment: formik.values.after_campaign_amount ? true : false,
      }
      isUpdate ? updateDeal({ deal_id, ...reqBody }) : addDeal(reqBody)
    },
  })

  const { data: campaignMedia } = useQuery(["campaignMedia"], () => campaignMediaFn())

  const campaignMedias = campaignMedia?.data?.data

  const handleAdvanceAmountChange = (e) => {
    let value = parseFloat(e.target.value)
    value = Math.min(Math.max(value, 0), 100)
    formik.setFieldValue("advance_amount", value)
    formik.setFieldValue("after_campaign_amount", 100 - value)
  }

  const handleAfterCampaignAmountChange = (e) => {
    let value = parseFloat(e.target.value)
    value = Math.min(Math.max(value, 0), 100)
    formik.setFieldValue("advance_amount", value)
    formik.setFieldValue("after_campaign_amount", 100 - value)
  }
  useEffect(() => {
    const initialInputs = campaignMedias?.map((type) => ({ campaign_media_id: type.id, url: "" }))
    setInputs(
      isUpdate
        ? deal?.campaign?.campaign_media?.map((i) => ({ campaign_media_id: i.campaign_media, url: i.url }))
        : initialInputs
    )
  }, [campaignMedias])

  const handleInputChange = (campaign_media_id, key, value) => {
    const newInputs = [...inputs]
    const index = newInputs?.findIndex((input) => input.campaign_media_id === campaign_media_id)
    if (index !== -1) {
      newInputs[index][key] = value
      setInputs(newInputs)
    }
  }

  return (
    <GlassDiv className="w-full !p-0">
      <GlassDiv className="flex items-center justify-between rounded-b-none !p-1">
        <p className="text-lg font-semibold">Deal</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </GlassDiv>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Deal Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <LeadSelect formik={formik} />

          <CustomInput
            id="deal_amount"
            formik={formik}
            type="number"
            placeholder="Enter Deal Amount"
            label="Deal Amount(INR)"
            lassName="mkx"
          />

          <CustomInput
            id="advance_amount"
            type="number"
            value={formik.values.advance_amount}
            placeholder="Enter Advance Amount(%)"
            label="Advance(%)"
            className="mkx"
            onChange={handleAdvanceAmountChange}
          />
          <CustomInput
            id="after_campaign_amount"
            type="number"
            lassName="mkx"
            value={formik.values.after_campaign_amount}
            placeholder="Enter After Campaign Amount(%)"
            label="After Campaign Amount(%)"
            onChange={handleAfterCampaignAmountChange}
          />
        </div>
        <p className="text-lg font-semibold text-blue-600">Campaign Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CreatorSelect formik={formik} />

          <CustomInput id="campaign_title" formik={formik} placeholder="Enter Campaign Title" label="Campaign Title" />

          <CustomSelect id="campaign_type" formik={formik} label="Campaign Type" placeholder="Select Campaign Type">
            <MenuItem value="Video">Video</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </CustomSelect>
          {formik.values.campaign_type === "Video" &&
            campaignMedias.map((type) => (
              <div key={type.id}>
                <CustomInput
                  id={`${type.title}_${type.id}`}
                  placeholder={`Enter ${type.title} URL`}
                  label={`${type.title} URL`}
                  value={inputs?.find((input) => input.campaign_media_id === type.id)?.url || ""}
                  onChange={(e) => handleInputChange(type.id, "url", e.target.value)}
                />
              </div>
            ))}

          {formik.values.campaign_type === "Event" && (
            <CustomInput id="campaign_data" formik={formik} placeholder="Enter Event Name" label="Event Name" />
          )}

          <CustomInput type="date" id="start_date" formik={formik} label="Start Date" />
          <CustomInput type="date" id="end_date" formik={formik} label="End Date" />
        </div>

        <p className="text-lg font-semibold text-blue-600">Description</p>

        <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Descriptions" />

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

export default ManageDeal
