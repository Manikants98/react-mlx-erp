import { Box } from "@mui/material"

const NoDataFound = ({ data }) => {
  if (data?.data?.data?.length === 0)
    return (
      <Box className="flex flex-col items-center justify-center h-full gap-3 py-16">
        <img src="https://pub-16f3de4d2c4841169d66d16992f9f0d3.r2.dev/assets/Sales/pana.svg" alt="" />
        <p className="text-3xl font-semibold">No Data Found</p>
      </Box>
    )
}

export default NoDataFound
