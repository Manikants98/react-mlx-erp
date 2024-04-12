import { Add, DoDisturb, Edit } from "@mui/icons-material"
import { Checkbox, Chip, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteInvoiceFn, invoiceListFn, updateInvoiceStatusFn } from "Services/Invoice"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Invoice = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const isAddPermit = usePermission("CRM", "add_leads_invoice")
  const isUpdatePermit = usePermission("CRM", "update_leads_invoice")
  const isDeletePermit = usePermission("CRM", "delete_leads_invoice")
  const isViewPermit = usePermission("CRM", "view_leads_invoice")

  const {
    data: invoicesList,
    isLoading,
    refetch,
  } = useQuery(["invoices", search, page, isViewPermit], () => invoiceListFn({ search, page }))

  const invoices = invoicesList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], invoices)

  const { mutate: deleteInvoice } = useMutation(deleteInvoiceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const { mutate: updateStatus } = useMutation(updateInvoiceStatusFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  return (
    <>
      <GlassDiv className="flex flex-col !p-0">
        <div className="flex justify-between p-2">
          <CustomInput
            placeholder="Search Invoices..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteInvoice({ invoice_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/invoice/add") : toast.warn("You don't have permission for add invoice.")
              }
            >
              Invoice
            </CustomButton>
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Date</TableCell>
                  <TableCell isHead>Invoice No</TableCell>
                  <TableCell isHead>Invoice Type</TableCell>
                  <TableCell isHead>Payment Type</TableCell>
                  <TableCell isHead>Payment Date</TableCell>
                  <TableCell isHead>Invoice Amount(INR)</TableCell>
                  <TableCell isHead>Campaign</TableCell>
                  <TableCell isHead>Deal No</TableCell>
                  <TableCell isHead>Status</TableCell>
                  <TableCell isHead>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={10} />
                {invoices?.map((invoice) => {
                  return (
                    <TableRow key={invoice.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(invoice.id)}
                          onChange={() => handleSelectRow(invoice.id)}
                        />
                      </TableCell>
                      <TableCell>{moment(invoice.created_date).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{invoice.invoice_no}</TableCell>
                      <TableCell>{invoice.invoice_type}</TableCell>
                      <TableCell className="!capitalize">{invoice.payment_type}</TableCell>
                      <TableCell>{moment(invoice.payment_date).format("DD/MM/YYYY")}</TableCell>

                      <TableCell>{invoice.total_amount} INR</TableCell>
                      <TableCell>{invoice.campaign_title} </TableCell>
                      <TableCell>{invoice.deal_no} </TableCell>
                      <TableCell>
                        <Chip
                          color={invoice.paid ? "success" : "error"}
                          label={invoice.paid ? "Paid" : "Unpaid"}
                          onClick={() => updateStatus({ invoice_id: invoice.id })}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomIconButton
                          onClick={() =>
                            isUpdatePermit
                              ? navigate("/invoice/update", { state: invoice.id })
                              : toast.warn("You don't have permission for update invoice.")
                          }
                        >
                          <Edit color="success" />
                        </CustomIconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span className="flex flex-col items-center justify-center h-full p-5 text-lg font-semibold">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view invoices.
          </span>
        )}

        <NoDataFound data={invoicesList} />
        <CustomPagination data={invoicesList} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default Invoice
