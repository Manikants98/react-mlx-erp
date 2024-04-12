import { Close } from "@mui/icons-material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Tab } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { CountryStateCitySelect } from "Helpers"
import { useDataHRM } from "Services/HRM"
import { addEmployeeFn, employeeDetailFn, updateEmployeeFn } from "Services/HRM/Employee"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import GlassDiv from "Shared/GlassDiv"
import { useFormik } from "formik"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageEmployee = () => {
  const { manage } = useParams()
  const { state: employee_id } = useLocation()
  // eslint-disable-next-line
  const [salaryData, setSalaryData] = useState([])
  const [value, setValue] = useState("1")
  const navigate = useNavigate()
  const isUpdate = manage === "update"

  const { mutate: addEmployee, isLoading } = useMutation(addEmployeeFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate("/employee")
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const { mutate: updateEmployee, isLoading: isLoadingUpdate } = useMutation(updateEmployeeFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate("/employee")
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const { data } = useQuery(["employee", employee_id], () => employeeDetailFn({ employee_id }))
  const employee = data?.data?.data

  const initialValues = {
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    joining_date: employee?.joining_date || "",
    email: employee?.email || "",
    dob: employee?.dob ? moment(employee?.dob).format("YYYY-MM-DD") : "2000-01-01",
    mobile: employee?.mobile || "",
    gender: employee?.gender || "",
    marital_status: employee?.marital_status || "",
    department_id: employee?.department || "",
    role_id: employee?.role || "",
    manager_id: employee?.manager || "",
    is_manager: "False",
    father_name: employee?.father_name || "",
    mother_name: employee?.mother_name || "",
    family_contact: employee?.family_contact || "",
    other_contact: employee?.other_contact || "",
    address: employee?.address || "",
    area: employee?.area || "",
    country_id: employee?.country || "",
    state_id: employee?.state || "",
    city_id: employee?.city || "",
    pincode: employee?.pincode || "",
    adhaar: employee?.adhaar || "",
    adhaar_pdf: employee?.adhaar_pdf || "",
    pan: employee?.pan || "",
    pan_pdf: employee?.pan_pdf || "",
    bank_name: employee?.bank_name || "",
    account_no: employee?.account_no || "",
    ifsc_code: employee?.ifsc_code || "",
    account_holder_name: employee?.account_holder_name || "",
    salary_type: employee?.salary_type || "",
    salary: employee?.salary || "",
    grade: employee?.grade || "",
    uan_number: employee?.uan_number || 0,
    other_allowances: employee?.other_allowances || 0,
    conveyance: employee?.conveyance || 0,
    incentives: employee?.incentives || 0,
    performance_allowances: employee?.performance_allowances || 0,
    esic_code: employee?.esic_code || 0,
    da: employee?.da || 0,
    high_school: employee?.high_school || "",
    inter: employee?.inter || "",
    graduation: employee?.graduation || "",
    post_graduation: employee?.post_graduation || "",
    other_docs: employee?.other_docs || "",
    offer_letter: employee?.offer_letter || "",
    salary_revision: employee?.salary_revision || "",
    relieving: employee?.relieving || "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const reqBody = new FormData()
      isUpdate && reqBody.append("employee_id", employee_id)
      reqBody.append("first_name", values.first_name)
      reqBody.append("last_name", values.last_name)
      reqBody.append("joining_date", values.joining_date)
      reqBody.append("email", values.email)
      reqBody.append("dob", values.dob)
      values.photo && reqBody.append("photo", values.photo)
      reqBody.append("mobile", values.mobile)
      reqBody.append("gender", values.gender)
      reqBody.append("marital_status", values.marital_status)
      reqBody.append("department_id", values.department_id)
      reqBody.append("role_id", values.role_id)
      reqBody.append("manager_id", values.manager_id)
      reqBody.append("is_manager", values.is_manager)
      reqBody.append("father_name", values.father_name)
      reqBody.append("mother_name", values.mother_name)
      reqBody.append("family_contact", values.family_contact)
      reqBody.append("other_contact", values.other_contact)
      reqBody.append("address", values.address)
      reqBody.append("area", values.area)
      reqBody.append("country_id", values.country_id)
      reqBody.append("state_id", values.state_id)
      reqBody.append("city_id", values.city_id)
      reqBody.append("pincode", values.pincode)
      reqBody.append("adhaar", values.adhaar)
      values.adhaar_pdf && reqBody.append("adhaar_pdf", values.adhaar_pdf)
      reqBody.append("pan", values.pan)
      values.pan_pdf && reqBody.append("pan_pdf", values.pan_pdf)
      reqBody.append("bank_name", values.bank_name)
      reqBody.append("account_no", values.account_no)
      reqBody.append("ifsc_code", values.ifsc_code)
      reqBody.append("account_holder_name", values.account_holder_name)
      reqBody.append("salary_type", values.salary_type)
      reqBody.append("grade_id", values.grade)
      reqBody.append("salary", values.salary)
      reqBody.append("other_allowances", values.other_allowances)
      reqBody.append("conveyance", values.conveyance)
      reqBody.append("incentives", values.incentives)
      reqBody.append("performance_allowances", values.performance_allowances)
      reqBody.append("esic_code", values.esic_code)
      reqBody.append("uan_number", values.uan_number)
      reqBody.append("da", values.da)
      values.high_school && reqBody.append("high_school", values.high_school)
      values.inter && reqBody.append("inter", values.inter)
      values.graduation && reqBody.append("graduation", values.graduation)
      values.post_graduation && reqBody.append("post_graduation", values.post_graduation)
      values.other_docs && reqBody.append("other_docs", values.other_docs)
      values.offer_letter && reqBody.append("offer_letter", values.offer_letter)
      values.salary_revision && reqBody.append("salary_revision", values.salary_revision)
      values.relieving && reqBody.append("relieving", values.relieving)
      isUpdate ? updateEmployee(reqBody) : addEmployee(reqBody)
    },
  })

  const { departments, managers, roles } = useDataHRM({ department_id: formik.values.department_id })

  const handleChange = (_, newValue) => setValue(newValue)

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full h-full gap-2">
      <GlassDiv className="!p-0 flex flex-col h-fit overflow-y-auto">
        <GlassDiv className="flex items-center justify-between !rounded-b-none !p-2">
          <p className="text-lg font-semibold"> {isUpdate ? "New" : "Update"} Employee</p>
          <CustomIconButton onClick={() => navigate("/employee")}>
            <Close />
          </CustomIconButton>
        </GlassDiv>

        <div className="flex flex-col gap-3 p-3">
          <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
            <CustomInput isRequired label="First Name" id="first_name" placeholder="Enter First Name" formik={formik} />

            <CustomInput id="last_name" placeholder="Enter" formik={formik} label="Last Name" />

            <CustomInput id="email" placeholder="Enter Email" formik={formik} label="Email" isRequired />

            <CustomSelect
              id="marital_status"
              placeholder="Select Marital Status"
              formik={formik}
              label="Marital Status"
            >
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"Unmarried"}>Un Married</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </CustomSelect>

            <CustomInput type="date" id="dob" formik={formik} label="Dob" isRequired />

            <CustomInput
              type="number"
              id="mobile"
              placeholder="Enter Mobile Number"
              formik={formik}
              label="Mobile"
              isRequired
            />

            <CustomSelect label="Gender" id="gender" placeholder="Select Gender" formik={formik}>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </CustomSelect>
          </div>

          <TabContext value={value}>
            <TabList onChange={handleChange} className="bg-white rounded-md bg-opacity-30">
              <Tab label="Other Details" value="1" className="!capitalize !text-base" />
              <Tab label="Familly Details" value="2" className="!capitalize !text-base" />
              <Tab label="Address" value="3" className="!capitalize !text-base" />
              <Tab label="KYC Details" value="4" className="!capitalize !text-base" />
              <Tab label="Sallery & Emp Benefits" value="5" className="!capitalize !text-base" />
              <Tab label="Document" value="6" className="!capitalize !text-base" />
            </TabList>

            <TabPanel value="1" className="!p-0">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Date Of Joining" id="joining_date" formik={formik} type="date" isRequired />

                <CustomInput
                  type="file"
                  id="photo"
                  onChange={(event) => formik.setFieldValue("photo", event.target.files[0])}
                  label="Choose Photo"
                  placeholder="Choose Photo"
                />

                <CustomSelect
                  label="Department"
                  id="department_id"
                  isRequired
                  placeholder="Enter Department"
                  formik={formik}
                >
                  {departments?.map((item) => (
                    <MenuItem value={item?.id}>{item?.title}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect label="Role" id="role_id" isRequired placeholder="Select Role" formik={formik}>
                  {roles?.map((item) => (
                    <MenuItem value={item?.id}>{item?.title}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect label="Manager" id="manager_id" isRequired formik={formik} placeholder="Select Manager">
                  {managers?.map((item) => (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  ))}
                </CustomSelect>

                <CustomSelect
                  label="Manager Status"
                  id="is_manager"
                  isRequired
                  formik={formik}
                  placeholder="Select Manager Status"
                >
                  <MenuItem value={"True"}>True</MenuItem>
                  <MenuItem value={"False"}>False</MenuItem>
                </CustomSelect>
              </div>
            </TabPanel>
            <TabPanel value="2" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Father Name" id="father_name" placeholder="Enter Father Name" formik={formik} />
                <CustomInput label="Mother Name" id="mother_name" placeholder="Enter Mother Name" formik={formik} />
                <CustomInput
                  label="Family Contact Number"
                  id="family_contact"
                  placeholder="Enter Family Contact Number"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Other Contact Number"
                  id="other_contact"
                  placeholder="Enter Other Contact Number"
                  formik={formik}
                />
              </div>
            </TabPanel>
            <TabPanel value="3" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Address" id="address" isRequired placeholder="Enter Address" formik={formik} />
                <CustomInput label="Area" id="area" isRequired placeholder="Enter Area" formik={formik} />
                <CountryStateCitySelect formik={formik} />
                <CustomInput type="number" label="Pincode" id="pincode" placeholder="Enter Pincode" formik={formik} />
              </div>
            </TabPanel>

            <TabPanel value="4" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput label="Adhaar" id="adhaar" placeholder="Enter Adhaar" formik={formik} />

                <CustomInput
                  type="file"
                  required
                  id="adhaar_pdf"
                  onChange={(event) => formik.setFieldValue("adhaar_pdf", event.target.files[0])}
                  label="Choose Adhar PDF"
                  placeholder="Choose Adhar PDF"
                />
                <CustomInput label="Pan Number" id="pan" placeholder="Enter Pan Number" formik={formik} />
                <CustomInput
                  type="file"
                  required
                  id="pan_pdf"
                  onChange={(event) => formik.setFieldValue("pan_pdf", event.target.files[0])}
                  label="Choose PAN PDF"
                  placeholder="Choose PAN PDF"
                />
                <CustomInput label="Account Holder Name" id="account_holder_name" placeholder="Enter" formik={formik} />
                <CustomInput label="Bank Number" id="account_no" placeholder="Enter Bank Number" formik={formik} />
                <CustomInput label="Bank Name" id="bank_name" placeholder="Enter Bank Name" formik={formik} />
                <CustomInput label="Bank IFSC Code" id="ifsc_code" placeholder="Enter Bank IFSC Code" formik={formik} />
              </div>
            </TabPanel>

            <TabPanel value="5" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomSelect
                  label="Salary Type"
                  variant="outlined"
                  id="salary_type"
                  isRequired
                  formik={formik}
                  placeholder="Selct Salary Type"
                >
                  <MenuItem value={"Grade Pay"}>Grade Pay</MenuItem>
                  <MenuItem value={"Basic Pay"}>Basic Pay</MenuItem>
                </CustomSelect>

                {formik.values["salary_type"] === "Grade Pay" ? (
                  <CustomSelect label="Grade Pay" id="grade" isRequired formik={formik} placeholder="Select Grade Pay">
                    {salaryData?.map((item) => (
                      <MenuItem value={item?.grade_id}>{item?.basic_salary}</MenuItem>
                    ))}
                  </CustomSelect>
                ) : (
                  <CustomInput
                    type="number"
                    isRequired
                    label="Basic Salary"
                    id="salary"
                    placeholder="Enter"
                    formik={formik}
                  />
                )}

                <CustomInput
                  type="number"
                  label="Incentives"
                  id="incentives"
                  placeholder="Enter Incentives"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Performance Allowances"
                  id="performance_allowances"
                  placeholder="Enter Performance Allowances"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Other Allowances"
                  id="other_allowances"
                  placeholder="Enter Other Allowances"
                  formik={formik}
                />

                <CustomInput
                  type="number"
                  label="UAN Number"
                  id="uan_number"
                  placeholder="Enter UAN Numbe"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Conveyance"
                  id="conveyance"
                  placeholder="Enter Conveyance"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="ESIC Code"
                  id="esic_code"
                  placeholder="Enter ESIC Code"
                  formik={formik}
                />
                <CustomInput
                  type="number"
                  label="Da Percentage"
                  id="da"
                  placeholder="Enter Da Percentage"
                  formik={formik}
                />
              </div>
            </TabPanel>
            <TabPanel value="6" className="!p-0 !pt-2">
              <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                <CustomInput
                  type="file"
                  id="high_school"
                  onChange={(event) => formik.setFieldValue("high_school", event.target.files[0])}
                  label="Choose High School"
                  placeholder="Choose High School"
                />
                <CustomInput
                  type="file"
                  id="inter"
                  onChange={(event) => formik.setFieldValue("inter", event.target.files[0])}
                  label="Choose Inter College"
                  placeholder="Choose Inter College"
                />
                <CustomInput
                  type="file"
                  id="graduation"
                  onChange={(event) => formik.setFieldValue("graduation", event.target.files[0])}
                  label="Choose Graduation"
                  placeholder="Choose Graduation"
                />
                <CustomInput
                  type="file"
                  id="post_graduation"
                  onChange={(event) => formik.setFieldValue("post_graduation", event.target.files[0])}
                  label="Choose Post Graduation"
                  placeholder="Choose Post Graduation"
                />
                <CustomInput
                  type="file"
                  id="other_docs"
                  onChange={(event) => formik.setFieldValue("other_docs", event.target.files[0])}
                  label="Choose Other Docs"
                  placeholder="Choose Other Docs"
                />
                <CustomInput
                  type="file"
                  id="offer_letter"
                  onChange={(event) => formik.setFieldValue("offer_letter", event.target.files[0])}
                  label="Choose Offer Letter"
                  placeholder="Choose Offer Letter"
                />
                <CustomInput
                  type="file"
                  id="salary_revision"
                  onChange={(event) => formik.setFieldValue("salary_revision", event.target.files[0])}
                  label="Choose Salary Revision"
                  placeholder="Choose Salary Revision"
                />
                <CustomInput
                  type="file"
                  id="relieving"
                  onChange={(event) => formik.setFieldValue("relieving", event.target.files[0])}
                  label="Choose Relieving"
                  placeholder="Choose Relieving"
                />
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </GlassDiv>
      <GlassDiv className="flex items-center justify-end gap-5">
        <CustomButton onClick={() => navigate("/hrm/employees")}>Cancel</CustomButton>
        <CustomButton isLoading={isLoading || isLoadingUpdate} type="submit">
          Save
        </CustomButton>
      </GlassDiv>
    </form>
  )
}

export default ManageEmployee
