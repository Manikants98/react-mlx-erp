import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
const billsReceivables = [
  {
    date: "2024-04-01",
    amount: 1000,
    description: "Product A Sale",
    customer: "Customer X",
    invoiceNumber: "INV001",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-02",
    amount: 1500,
    description: "Service B Sale",
    customer: "Customer Y",
    invoiceNumber: "INV002",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-03",
    amount: 800,
    description: "Product C Sale",
    customer: "Customer Z",
    invoiceNumber: "INV003",
    paymentMethod: "Bank Transfer",
    salesperson: "Alice Johnson",
  },
  {
    date: "2024-04-04",
    amount: 1200,
    description: "Service D Sale",
    customer: "Customer W",
    invoiceNumber: "INV004",
    paymentMethod: "Cash",
    salesperson: "Bob Brown",
  },
  {
    date: "2024-04-05",
    amount: 2000,
    description: "Product E Sale",
    customer: "Customer V",
    invoiceNumber: "INV005",
    paymentMethod: "Credit Card",
    salesperson: "Eve Wilson",
  },
  {
    date: "2024-04-06",
    amount: 900,
    description: "Service F Sale",
    customer: "Customer U",
    invoiceNumber: "INV006",
    paymentMethod: "Cash",
    salesperson: "Frank Davis",
  },
  {
    date: "2024-04-07",
    amount: 1300,
    description: "Product G Sale",
    customer: "Customer T",
    invoiceNumber: "INV007",
    paymentMethod: "Credit Card",
    salesperson: "Grace Martinez",
  },
  {
    date: "2024-04-08",
    amount: 1800,
    description: "Service H Sale",
    customer: "Customer S",
    invoiceNumber: "INV008",
    paymentMethod: "Bank Transfer",
    salesperson: "Harry Anderson",
  },
  {
    date: "2024-04-09",
    amount: 1100,
    description: "Product I Sale",
    customer: "Customer R",
    invoiceNumber: "INV009",
    paymentMethod: "Cash",
    salesperson: "Ivy Garcia",
  },
  {
    date: "2024-04-10",
    amount: 1600,
    description: "Service J Sale",
    customer: "Customer Q",
    invoiceNumber: "INV010",
    paymentMethod: "Credit Card",
    salesperson: "Jack White",
  },
]

const BillsReceivables = () => {
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
              <TableCell isHead>Customer</TableCell>
              <TableCell isHead>Invoice Number</TableCell>
              <TableCell isHead>Payment Method</TableCell>
              <TableCell isHead>Salesperson</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billsReceivables.map((bill) => (
              <TableRow key={bill.invoiceNumber}>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.amount}</TableCell>
                <TableCell>{bill.description}</TableCell>
                <TableCell>{bill.customer}</TableCell>
                <TableCell>{bill.invoiceNumber}</TableCell>
                <TableCell>{bill.paymentMethod}</TableCell>
                <TableCell>{bill.salesperson}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={billsReceivables} />
      <CustomPagination />
    </GlassDiv>
  )
}

export default BillsReceivables
