import { Close, Fullscreen, FullscreenExit } from "@mui/icons-material"
import { Dialog } from "@mui/material"
import classNames from "classnames"
import React, { useState } from "react"
import CustomButton from "../CustomButton"

const MediaViewer = ({ url }) => {
  const [open, setOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>View</CustomButton>
      <Dialog
        open={open}
        draggable
        onClose={() => setOpen(false)}
        fullScreen={isFullScreen}
        PaperProps={{
          className: "!rounded-none !bg-transparent",
          style: {
            maxHeight: isFullScreen ? "100%" : "80%",
            maxWidth: isFullScreen ? "100%" : "60%",
          },
        }}
      >
        <span className="flex justify-between border-b border-white border-opacity-10 items-center !text-white bg-[#323639]">
          <p className="px-2 text-sm"></p>
          <span className="flex items-center">
            {isFullScreen ? (
              <FullscreenExit
                className="!border !text-3xl hover:!text-blue-500 !border-white !border-opacity-20 cursor-pointer"
                onClick={() => setIsFullScreen(false)}
              />
            ) : (
              <Fullscreen
                className="!border-x !text-3xl hover:!text-blue-500 !border-white !border-opacity-20 cursor-pointer"
                onClick={() => setIsFullScreen(true)}
              />
            )}
            <Close
              className="!border-r !text-3xl hover:!text-red-500 !border-white !border-opacity-20 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </span>
        </span>

        <div className="flex justify-center overflow-auto bg-white">
          <iframe
            frameBorder="0"
            src={`${url}#toolbar=0`}
            className={classNames(isFullScreen ? "w-[99.9vw] h-[98vh]" : "w-[58vw] h-[76vh]")}
          />
        </div>
      </Dialog>
    </>
  )
}

export default MediaViewer
