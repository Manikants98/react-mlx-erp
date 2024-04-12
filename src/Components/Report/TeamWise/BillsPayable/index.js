import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
const billsPayable = [
  {
    date: "2024-04-01",
    amount: 1000,
    description: "Product A Sale",
    vendor: "Customer X",
    invoiceNumber: "INV001",
    paymentMethod: "Credit Card",
    purchaser: "John Doe",
  },
  {
    date: "2024-04-02",
    amount: 1500,
    description: "Service B Sale",
    vendor: "Customer Y",
    invoiceNumber: "INV002",
    paymentMethod: "Cash",
    purchaser: "Jane Smith",
  },
  {
    date: "2024-04-03",
    amount: 800,
    description: "Product C Sale",
    vendor: "Customer Z",
    invoiceNumber: "INV003",
    paymentMethod: "Bank Transfer",
    purchaser: "Alice Johnson",
  },
  {
    date: "2024-04-04",
    amount: 1200,
    description: "Service D Sale",
    vendor: "Customer W",
    invoiceNumber: "INV004",
    paymentMethod: "Cash",
    purchaser: "Bob Brown",
  },
  {
    date: "2024-04-05",
    amount: 2000,
    description: "Product E Sale",
    vendor: "Customer V",
    invoiceNumber: "INV005",
    paymentMethod: "Credit Card",
    purchaser: "Eve Wilson",
  },
  {
    date: "2024-04-06",
    amount: 900,
    description: "Service F Sale",
    vendor: "Customer U",
    invoiceNumber: "INV006",
    paymentMethod: "Cash",
    purchaser: "Frank Davis",
  },
  {
    date: "2024-04-07",
    amount: 1300,
    description: "Product G Sale",
    vendor: "Customer T",
    invoiceNumber: "INV007",
    paymentMethod: "Credit Card",
    purchaser: "Grace Martinez",
  },
  {
    date: "2024-04-08",
    amount: 1800,
    description: "Service H Sale",
    vendor: "Customer S",
    invoiceNumber: "INV008",
    paymentMethod: "Bank Transfer",
    purchaser: "Harry Anderson",
  },
  {
    date: "2024-04-09",
    amount: 1100,
    description: "Product I Sale",
    vendor: "Customer R",
    invoiceNumber: "INV009",
    paymentMethod: "Cash",
    purchaser: "Ivy Garcia",
  },
  {
    date: "2024-04-10",
    amount: 1600,
    description: "Service J Sale",
    vendor: "Customer Q",
    invoiceNumber: "INV010",
    paymentMethod: "Credit Card",
    purchaser: "Jack White",
  },
]

const BillsPayable = () => {
  return (
    <GlassDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput type="search" placeholder="Search" />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Date</TableCell>
              <TableCell isHead>Amount</TableCell>
              <TableCell isHead>Description</TableCell>
              <TableCell isHead>Vendor</TableCell>
              <TableCell isHead>Invoice Number</TableCell>
              <TableCell isHead>Payment Method</TableCell>
              <TableCell isHead>Purchaser</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billsPayable.map((bill) => (
              <TableRow key={bill.invoiceNumber}>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.amount}</TableCell>
                <TableCell>{bill.description}</TableCell>
                <TableCell>{bill.vendor}</TableCell>
                <TableCell>{bill.invoiceNumber}</TableCell>
                <TableCell>{bill.paymentMethod}</TableCell>
                <TableCell>{bill.purchaser}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={billsPayable} />
      <CustomPagination />
    </GlassDiv>
  )
}

export default BillsPayable
