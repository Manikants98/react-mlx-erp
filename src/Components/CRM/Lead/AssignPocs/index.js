import { Assignment } from "@mui/icons-material"
import { IconButton, MenuItem, Tooltip } from "@mui/material"
import { changePocFn, leadsPocDataFn } from "Services/CRM/Lead"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import CustomSelect from "Shared/CustomSelect"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AssignPocs = ({ label, lead_id, front_poc_id, back_poc_id }) => {
  const [open, setOpen] = useState(false)
  const client = useQueryClient()

  const { data: leadsPocData } = useQuery(["leadsPocData"], () => leadsPocDataFn())

  const frontPOCs = leadsPocData?.data?.data

  const { mutate: changePoc } = useMutation(changePocFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("leads")
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const initialValues = { front_poc_id: front_poc_id || "", back_poc_id: back_poc_id || "" }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      changePoc({ lead_id, ...formik.values })
    },
  })
  return (
    <>
      <Tooltip arrow placement="top" title={`Assign ${label}`}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <Assignment color="primary" />
        </IconButton>
      </Tooltip>

      <CustomModal open={open} setOpen={setOpen} title={`Assign ${label}`} className="w-[430px]" padding={4}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CustomSelect
            id={label === "Back POC" ? "back_poc_id" : "front_poc_id"}
            label={label}
            placeholder={`Select ${label}`}
            formik={formik}
          >
            {frontPOCs?.map((i, index) => {
              return (
                <MenuItem key={index} value={i.id}>
                  {i?.name}
                </MenuItem>
              )
            })}
          </CustomSelect>

          <span className="flex items-center justify-center w-full p-3">
            <CustomButton type="submit">Proceed</CustomButton>
          </span>
        </form>
      </CustomModal>
    </>
  )
}

export default AssignPocs
