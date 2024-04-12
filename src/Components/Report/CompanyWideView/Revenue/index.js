import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
const revenueData = [
  {
    date: "2024-04-01",
    amount: 1000,
    description: "Sale of product A",
    category: "Product Sales",
    customer: "Customer A",
    invoiceNumber: "INV001",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-02",
    amount: 1500,
    description: "Sale of service B",
    category: "Service Revenue",
    customer: "Customer B",
    invoiceNumber: "INV002",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-03",
    amount: 1200,
    description: "Sale of product C",
    category: "Product Sales",
    customer: "Customer C",
    invoiceNumber: "INV003",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-04",
    amount: 1800,
    description: "Sale of service D",
    category: "Service Revenue",
    customer: "Customer D",
    invoiceNumber: "INV004",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-05",
    amount: 900,
    description: "Sale of product E",
    category: "Product Sales",
    customer: "Customer E",
    invoiceNumber: "INV005",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-06",
    amount: 1300,
    description: "Sale of service F",
    category: "Service Revenue",
    customer: "Customer F",
    invoiceNumber: "INV006",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-07",
    amount: 1100,
    description: "Sale of product G",
    category: "Product Sales",
    customer: "Customer G",
    invoiceNumber: "INV007",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-08",
    amount: 1700,
    description: "Sale of service H",
    category: "Service Revenue",
    customer: "Customer H",
    invoiceNumber: "INV008",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-09",
    amount: 950,
    description: "Sale of product I",
    category: "Product Sales",
    customer: "Customer I",
    invoiceNumber: "INV009",
    paymentMethod: "Credit Card",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-10",
    amount: 1400,
    description: "Sale of service J",
    category: "Service Revenue",
    customer: "Customer J",
    invoiceNumber: "INV010",
    paymentMethod: "Cash",
    salesperson: "Jane Smith",
  },
]

const Revenue = () => {
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
              <TableCell isHead>Category</TableCell>
              <TableCell isHead>Customer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenueData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.customer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={revenueData} />
      <CustomPagination />
    </GlassDiv>
  )
}

export default Revenue
