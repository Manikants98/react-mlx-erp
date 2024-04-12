import "./index.css"

const Loader = ({ color = "#3498db" }) => {
  return (
    <div className="loading-wave">
      <div style={{ backgroundColor: color }} className="loading-bar"></div>
      <div style={{ backgroundColor: color }} className="loading-bar"></div>
      <div style={{ backgroundColor: color }} className="loading-bar"></div>
      <div style={{ backgroundColor: color }} className="loading-bar"></div>
    </div>
  )
}

export default Loader
