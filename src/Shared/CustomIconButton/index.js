import { IconButton } from "@mui/material"
import classNames from "classnames"

/**
 * Custom icon button component.
 * @param {import("@mui/material").IconButtonProps} props - IconButton Props
 * @param {string} className - The CSS class name.
 * @returns {JSX.Element} IconButton component.
 */
const CustomIconButton = ({ className = "", size = "small", ...rest }) => {
  return <IconButton size={size} className={classNames("!bg-white !bg-opacity-20", className)} {...rest} />
}

export default CustomIconButton
