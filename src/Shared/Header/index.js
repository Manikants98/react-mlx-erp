import GlassDiv from "Shared/GlassDiv"
import { Notifications } from "Shared/Notfications"
import ProfileMenu from "Shared/ProfileMenu"
import moment from "moment"
/**
 * Header component
 * @param {Object} props - Component props
 * @param {string} props.navItem - The navigation item
 */
const Header = ({ navItem }) => {
  const date = localStorage.getItem("ExpDate")
  const daysRemain = Math.abs(moment().diff(date, "days"))
  const isExpiring = daysRemain <= 7

  return (
    <>
      <GlassDiv className="z-50 flex flex-row items-center justify-between w-full !p-2">
        <p className="text-xl font-bold">{navItem}</p>
        {isExpiring && (
          <GlassDiv className="!p-2 !rounded">
            <p className="text-xs font-semibold text-red-500 animate-pulse">
              Your licence will be expiring on <span className="!text-sm !font-bold">{moment(date).format("ll")}</span>
            </p>
          </GlassDiv>
        )}
        <div className="flex items-center justify-center gap-5">
          {/* <TipsAndUpdates />
          <Backgrounds handleFontChange={handleFontChange} /> */}
          <Notifications />
          <ProfileMenu />
        </div>
      </GlassDiv>
    </>
  )
}

export default Header
