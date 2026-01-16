import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S.No.",
        selector: (row) => row.sno,
        width: "70px",
        center: true
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px",
        center: true
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "180px",
        center: true
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "130px",
        center: true
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "100px",
        center: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "400px",
        center: true,
        ignoreRowClick: true,
    }
]

export const LeaveButtons = ({ _id }) => {
    const navigate = useNavigate();

    const handleView = (_id) => {
        navigate(`/admin-dashboard/leaves/${_id}`);
    }

    return (
        <button
            className="px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-md"
            onClick={() => handleView(_id)}
        >
            View
        </button>
    )
}