import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export const fetchDepartments = async () => {
  let departments;

  const API = api;

  try {
    const response = await API.get("/departments");

    if (response.data.success) {
      departments = response.data.data.departments;
    }

  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }

  }

  return departments;

};

export const columns = [

  // Inside this array, we will define all the columns that we want in the employee table

  {
    name: "S.No.",
    selector: (row) => row.sno,
    width: "70px",
    center: true
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
    center: true
  },
  {
    name: "Avatar",
    cell: row => (
      <img
        src={row.avatar}
        alt="avatar"
        onError={(e) => {
          e.currentTarget.src = "/default-avatar.png";
        }}
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
    width: "90px",
    center: true,
    ignoreRowClick: true,
    wrap: false,
    allowOverflow: true
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "180px",
    center: true
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
    center: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
    width: "500px",
    center: true,
    ignoreRowClick: true,
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (

    <div className="flex space-x-3">

      <button 
        className="px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>

      <button 
        className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>

      <button className="px-4 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md">
        Salary
      </button>

      <button className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">
        Leave
      </button>

    </div>

  );

};