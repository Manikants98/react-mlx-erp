import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded"
import { Badge, CircularProgress, IconButton, Menu, MenuItem, useTheme } from "@mui/material"
import { notifictaionListFn } from "Services/Notification"
import moment from "moment"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

export const Notifications = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line
  const [isRead, setIsRead] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  const { data, isLoading, isError } = useQuery(
    ["Notifications", page, isRead],
    () =>
      notifictaionListFn({
        page,
        notification_category: category ?? "",
        filter_notification: isRead ? "read" : "unread",
      }),
    { enabled: false }
  )

  useEffect(() => {
    if (data?.data?.data) {
      setNotifications((prev) => [...prev, ...data.data.data])
      return () => {}
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setPage(1)
      setNotifications(data?.data?.data)
      return () => {}
    }
  }, [isRead])

  useEffect(() => {
    if (data?.data?.notification_count) {
      setNotificationCount(data.data.notification_count)
      return () => {}
    }
  }, [data])

  return (
    <>
      <IconButton className="!bg-white !bg-opacity-20" onClick={handleOpen}>
        <Badge badgeContent={notificationCount} color="primary">
          <NotificationsRoundedIcon className="!text-white !text-opacity-80" />
        </Badge>
      </IconButton>

      <Menu
        MenuListProps={{ className: "!p-0", sx: { fontFamily: useTheme().typography.fontFamily } }}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        className="!top-2"
      >
        <div className="flex items-center justify-between p-2">
          <p className="font-semibold">Notifications</p>
          {/* <span className="flex items-center gap-2">
            <p>{isRead ? "Read" : "Unread"}</p>{" "}
            <Switch size="small" value={isRead} onChange={(event) => setIsRead(event.target.checked)} />
          </span> */}
        </div>
        <div
          className="h-96 !w-80 flex flex-col gap-px overflow-y-auto p-px"
          onScroll={(e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
            if (bottom && !isLoading && !isError) {
              page !== Number(data?.data?.total_pages) && setPage((prevPage) => prevPage + 1)
            }
          }}
        >
          {notifications?.map((notification, index) => (
            <MenuItem
              key={index}
              className="!flex !flex-col gap-1 !py-1 !px-2 !bg-blue-300 !rounded !items-start !justify-start"
            >
              <div className="flex items-center justify-between w-full">
                <p className="!font-semibold text-sm">{notification.category}</p>
                <p className="text-xs">{moment(notification.date).calendar()}</p>
              </div>
              <p className="text-xs !text-wrap">
                <span className="font-semibold text-green-600"> {notification.subject}</span> : {notification.message}
              </p>
            </MenuItem>
          ))}
          {isLoading && (
            <span className="flex items-center justify-center gap-2">
              <p>Loading...</p> <CircularProgress size={20} thickness={5} />
            </span>
          )}
          {isError && (
            <span className="flex items-center justify-center gap-2">
              <p>Error fetching data.</p>
            </span>
          )}
        </div>
      </Menu>
    </>
  )
}
