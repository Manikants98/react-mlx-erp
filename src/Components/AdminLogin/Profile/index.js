import { Facebook, Instagram, Twitter } from "@mui/icons-material"
import { Avatar, CircularProgress } from "@mui/material"
import { useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import GlassDiv from "Shared/GlassDiv"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const { profile, isLoading } = useProfile()
  const navigate = useNavigate()

  return isLoading ? (
    <GlassDiv className="flex items-center justify-center w-full h-full">
      <CircularProgress thickness={4} size={50} />
    </GlassDiv>
  ) : (
    <GlassDiv className="flex justify-between gap-10">
      <div className="flex flex-col items-center justify-center w-1/3 gap-3 p-5 text-lg">
        <Avatar src={profile?.profile_pic || "uhg"} alt={profile?.name} className="!h-32 !text-5xl !w-32" />
        <p className="text-xl font-bold uppercase">{profile?.name}</p>
        <p className="text-center">
          {profile?.city_name}, {profile?.state_name}, {profile?.country_name}, {profile?.pin_code}{" "}
        </p>
        <p className="w-full !text-white text-center rounded bg-black">Contact </p>
        <div className="flex gap-5">
          <Link target="_blank" to={profile?.facebook_link}>
            <Facebook />
          </Link>
          <Link target="_blank" to={profile?.twitter_link}>
            <Twitter />
          </Link>
          <Link target="_blank" to={profile?.instagram_link}>
            <Instagram />
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-2/3 px-10 py-5">
        <p className="text-xl font-semibold">Profile Details</p>
        <div className="flex gap-5 py-5 text-lg">
          <div className="flex flex-col justify-center h-fit gap-y-5">
            <p>
              <strong>First Name:</strong> {profile?.first_name || "N/A"}
            </p>
            <p>
              <strong>DOB:</strong> {moment(profile?.dob).format("DD-MM-YYYY") || "N/A"}
            </p>
            <p>
              <strong>Father Name:</strong> {profile?.father_name || "N/A"}
            </p>
            <p>
              <strong>Area:</strong> {profile?.area || "N/A"}
            </p>
            <p>
              <strong>State:</strong> {profile?.state_name || "N/A"}
            </p>
            <p>
              <strong>Aadhar Card Number:</strong> {profile?.adhaar || "N/A"}
            </p>
            <p>
              <strong>Pincode:</strong> {profile?.pin_code || "N/A"}
            </p>
          </div>
          <div className="flex flex-col justify-center h-fit gap-y-5">
            <p>
              <strong>Last Name:</strong> {profile?.last_name || "N/A"}
            </p>
            <p>
              <strong>Mobile No :</strong> {profile?.mobile || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email || "N/A"}
            </p>
            <p>
              <strong>Mother Name:</strong> {profile?.mother_name || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {profile?.city_name || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {profile?.country_name || "N/A"}
            </p>
          </div>
        </div>
        <CustomButton className="!p-1 w-32" onClick={() => navigate("/update-profile")}>
          Edit Profile
        </CustomButton>
      </div>
    </GlassDiv>
  )
}

export default Profile
