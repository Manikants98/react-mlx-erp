import { FilterList, VisibilityOff } from "@mui/icons-material"
import * as Material from "@mui/material"
import CustomIconButton from "Shared/CustomIconButton"
import { CustomLoader } from "Shared/CustomLoader"
import classNames from "classnames"
import { useState } from "react"

/**
 * CustomTable component for displaying data in a table format.
 * @param {Object} props - The props object.
 * @param {Array} props.tableHead - Array of objects representing table header items.
 * @param {Array} props.tableBody - Array of objects representing table body data.
 * @param {boolean} [props.isLoading=false] - Flag indicating whether data is loading.
 * @param {number} [props.totalPages=0] - Total number of pages.
 * @param {Function} props.handlePageChange - Function to handle page change event.
 * @param {number} [props.page=1] - Current page number.
 * @param {number} [props.paddingY=8] - Padding Y value for table cells.
 * @param {Function} props.onClickRow - Function to handle row click event.
 * @param {boolean} [props.isPagination=true] - Flag indicating whether pagination is enabled.
 * @param {string} props.filters - Reference for session storage.
 * @returns {JSX.Element} - JSX element representing the custom table.
 */
const CustomTable = ({
  tableHead,
  tableBody,
  isLoading = false,
  totalPages = 0,
  handlePageChange,
  page = 1,
  paddingY = 8,
  onClickRow,
  isPagination = true,
  filters,
  setFilters,
}) => {
  const dataIsEmpty = "https://pub-16f3de4d2c4841169d66d16992f9f0d3.r2.dev/assets/Sales/pana.svg"

  /**
   * Handle click event to toggle visibility of table columns.
   * @param {string} columnId - ID of the column to be toggled.
   */
  const handleColumnVisibilityToggle = (columnId) => {
    setFilters([...filters, columnId])
  }
  const VisibleItems = tableHead?.filter((cell) => !filters?.includes(cell.id))
  return (
    <>
      <Material.TableContainer component="div">
        <Material.Table>
          <Material.TableHead>
            <Material.TableRow className="!whitespace-nowrap !bg-white !bg-opacity-40 !border-b !w-full">
              {VisibleItems?.map((cell, index) => (
                <Material.TableCell
                  key={index}
                  className={classNames(
                    `!font-bold !p-1 !py-[${paddingY}px] !text-center !bg-transparent !border-opacity-50`,
                    index === tableHead?.length - 1 ? "" : "border-r"
                  )}
                >
                  <span className="flex items-center justify-center gap-4 px-2">
                    {cell.headItem}
                    {filters && cell.id !== "checkbox" && (
                      <Material.IconButton size="small" onClick={() => handleColumnVisibilityToggle(cell.id)}>
                        <VisibilityOff fontSize="small" />
                      </Material.IconButton>
                    )}
                  </span>
                </Material.TableCell>
              ))}
            </Material.TableRow>
          </Material.TableHead>
          <Material.TableBody>
            <CustomLoader loading={isLoading} row={VisibleItems?.length - 1} />
            {tableBody?.map((row, index) => (
              <Material.TableRow
                key={index}
                className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer"
                onClick={onClickRow}
              >
                {VisibleItems?.map((cell, index) => (
                  <Material.TableCell
                    cell={cell.id}
                    className={classNames(
                      "!whitespace-nowrap !p-1 !text-center !border-white !border-opacity-50",
                      index === VisibleItems?.length - 1 ? "" : "border-r"
                    )}
                  >
                    {row[cell.id]}
                  </Material.TableCell>
                ))}
              </Material.TableRow>
            ))}
          </Material.TableBody>
        </Material.Table>
        {!isLoading && tableBody?.length === 0 && (
          <Material.Box className="flex flex-col items-center justify-center h-full gap-3 py-20">
            <img src={dataIsEmpty} alt="" />
            <p className="text-3xl font-semibold">No Data Found</p>
          </Material.Box>
        )}
      </Material.TableContainer>

      <span className="flex justify-end p-2">
        {isPagination && totalPages && totalPages !== 1 && (
          <Material.Pagination
            page={page ?? 0}
            count={totalPages ?? 0}
            variant="outlined"
            color="primary"
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        )}
      </span>
    </>
  )
}

/**
 * TableFilter component for managing table column visibility.
 * @param {Object} props - The props object.
 * @param {Array} props.tableHead - Array of objects representing table header items.
 * @param {Function} props.setFilters - Function to set filters.
 * @param {Array} props.filters - Array of currently active filters.
 * @returns {JSX.Element} - JSX element representing the table filter.
 */
const TableFilter = ({ tableHead, setFilters, filters }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  /**
   * Handles click event to open filter menu.
   * @param {Object} event - The event object.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * Handles close event of filter menu.
   */
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * Handles visibility toggle for columns.
   * @param {string} columnId - The ID of the column.
   */
  const handleVisibility = (columnId) => {
    if (filters.includes(columnId)) {
      setFilters(filters.filter((filter) => filter !== columnId))
    } else {
      setFilters([...filters, columnId])
    }
  }

  return (
    <>
      <CustomIconButton color="primary" onClick={handleClick}>
        <FilterList />
      </CustomIconButton>
      <Material.Menu open={open} anchorEl={anchorEl} onClose={handleClose} className="!right-20">
        <div className="flex flex-col gap-1 min-w-56">
          {tableHead
            ?.filter((item) => item.id !== "checkbox")
            ?.map((item) => {
              return (
                <div className="flex items-center gap-1 px-1" key={item.id}>
                  <Material.Switch
                    onChange={() => handleVisibility(item.id)}
                    size="small"
                    checked={!filters.includes(item.id)}
                  />
                  {item.headItem}
                </div>
              )
            })}
        </div>
      </Material.Menu>
    </>
  )
}

const TableCell = ({ className = "", children, isHead = false, isCentered = true, padding = 2, ...rest }) => {
  return (
    <Material.TableCell
      className={classNames(
        "!border-r !border-white !border-opacity-50",
        isHead && "!font-bold !bg-white !bg-opacity-40",
        isCentered && "!text-center",
        `!p-${padding}`,
        className
      )}
      {...rest}
    >
      {children}
    </Material.TableCell>
  )
}

export { CustomTable, TableCell, TableFilter }
