import classNames from "classnames"
import React from "react"

/**
 * GlassDiv component represents a div element with a glassy appearance.
 * @param {object} props - Props object.
 * @param {Function} props.onClick - Click event handler.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {object} [props.style={}] - Inline styles for the div.
 * @returns {JSX.Element} - GlassDiv component.
 */
const GlassDiv = ({ onClick, children, className = "", style = {} }) => {
  return (
    <div
      className={classNames(
        "p-3 rounded-lg shadow bg-white bg-opacity-20 border-white border border-opacity-20",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}

export default GlassDiv
