import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
const profitData = [
  {
    date: "2024-04-01",
    amount: 500,
    description: "Sale of product X",
    category: "Product Sales",
    customer: "Customer X",
    invoiceNumber: "INV001",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-02",
    amount: 800,
    description: "Sale of service Y",
    category: "Service Revenue",
    customer: "Customer Y",
    invoiceNumber: "INV002",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-03",
    amount: 700,
    description: "Consultation fee",
    category: "Consulting",
    customer: "Customer Z",
    invoiceNumber: "INV003",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-04",
    amount: 600,
    description: "Sale of product Z",
    category: "Product Sales",
    customer: "Customer Z",
    invoiceNumber: "INV004",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-05",
    amount: 900,
    description: "Training session",
    category: "Training",
    customer: "Customer X",
    invoiceNumber: "INV005",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-06",
    amount: 750,
    description: "Sale of software",
    category: "Software Sales",
    customer: "Customer Y",
    invoiceNumber: "INV006",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-07",
    amount: 550,
    description: "Consulting fee",
    category: "Consulting",
    customer: "Customer Z",
    invoiceNumber: "INV007",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-08",
    amount: 850,
    description: "Sale of service A",
    category: "Service Revenue",
    customer: "Customer A",
    invoiceNumber: "INV008",
    salesperson: "Jane Smith",
  },
  {
    date: "2024-04-09",
    amount: 950,
    description: "Sale of product B",
    category: "Product Sales",
    customer: "Customer B",
    invoiceNumber: "INV009",
    salesperson: "John Doe",
  },
  {
    date: "2024-04-10",
    amount: 720,
    description: "Training session",
    category: "Training",
    customer: "Customer Y",
    invoiceNumber: "INV010",
    salesperson: "Jane Smith",
  },
]

const Profit = () => {
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
              <TableCell isHead>Invoice Number</TableCell>
              <TableCell isHead>Salesperson</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profitData.map((profit, index) => (
              <TableRow key={index}>
                <TableCell>{profit.date}</TableCell>
                <TableCell>{profit.amount}</TableCell>
                <TableCell>{profit.description}</TableCell>
                <TableCell>{profit.category}</TableCell>
                <TableCell>{profit.customer}</TableCell>
                <TableCell>{profit.invoiceNumber}</TableCell>
                <TableCell>{profit.salesperson}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={profitData} />
      <CustomPagination />
    </GlassDiv>
  )
}

export default Profit
