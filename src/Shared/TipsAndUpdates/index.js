import { Close, TipsAndUpdatesRounded } from "@mui/icons-material"
import { Divider, Drawer, IconButton } from "@mui/material"
import { getNewsFn } from "Services/News"
import Loader from "Shared/Loader"
import { useState } from "react"
import { useQuery } from "react-query"

const TipsAndUpdates = () => {
  const [open, setOpen] = useState(false)
  const { data: news, isLoading } = useQuery(["newsAndAnnouncement"], getNewsFn)

  return (
    <>
      <IconButton className="h-10 w-10 !bg-white !bg-opacity-20" onClick={() => setOpen(true)}>
        <TipsAndUpdatesRounded className="!text-white !text-opacity-80" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ className: "!w-[500px]" }}>
        <span className="flex items-center justify-between p-2">
          <p className="text-[#00a4bd] font-semibold">News and Announcement</p>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </span>
        <Divider />
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          news?.data?.data?.map((log) => {
            const formattedDate = log.publish_date ? log.publish_date : "Coming Soon"
            return (
              <span key={log.id}>
                <div className="flex flex-col gap-1 py-1">
                  <span className="flex justify-between px-2 py-1 font-semibold">
                    <p>{log.title}</p>
                    <p className="text-green-600">{formattedDate}</p>
                  </span>
                  {log?.data?.map((new_feature, index) => {
                    return (
                      <span key={index} className="flex items-start gap-2 px-2">
                        <p> • </p>
                        <p key={index} className="text-sm text-gray-700">
                          {new_feature}
                        </p>
                      </span>
                    )
                  })}
                </div>
                <Divider />
              </span>
            )
          })
        )}
      </Drawer>
    </>
  )
}

export default TipsAndUpdates
