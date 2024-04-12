import { AccountCircle, LockReset, Logout } from "@mui/icons-material"
import { Avatar, Divider, ListItemButton, Menu } from "@mui/material"
import { useProfile } from "Settings"
import { useState } from "react"
import { Link } from "react-router-dom"
export const LogoutBusiness = () => {
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = "/"
}
const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { profile } = useProfile()
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log(profile)
  return (
    <>
      <Avatar
        src={profile?.profile_pic}
        alt={profile?.name}
        onClick={handleClick}
        className="!text-2xl !bg-white !bg-opacity-20 !text-white"
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="!top-3"
        MenuListProps={{ className: "!w-56" }}
      >
        <div className="flex flex-col items-center justify-center gap-2 py-3">
          <Avatar alt={profile?.name} src={profile?.profile_pic} className="!text-2xl !capitalize !h-14 !w-14" />
          <div className="flex flex-col items-center justify-center ">
            <p className="capitalize">{profile?.name}</p>
            <p className="text-xs">{profile?.email}</p>
          </div>
        </div>
        <Divider />
        <Link to="/profile">
          <ListItemButton className="!flex gap-2" onClick={handleClose}>
            <AccountCircle /> Profile
          </ListItemButton>
        </Link>
        {/* {localStorage.getItem("role") === "Store Admin" && (
          <Link to="/store">
            <ListItemButton className="!flex gap-2" onClick={handleClose}>
              <Store /> My Store
            </ListItemButton>
          </Link>
        )} */}

        {/* <TwoFactorAnable twoStep={two_step} handleClose1={handleClose} /> */}
        <Link to="/reset-password">
          <ListItemButton className="!flex gap-2" onClick={handleClose}>
            <LockReset />
            Change Password
          </ListItemButton>
        </Link>
        <ListItemButton className="!flex gap-2" onClick={LogoutBusiness}>
          <Logout />
          Logout
        </ListItemButton>
      </Menu>
    </>
  )
}

export default ProfileMenu
