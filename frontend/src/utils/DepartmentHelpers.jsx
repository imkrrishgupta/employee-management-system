import { useNavigate } from "react-router-dom"
import api from "../api/axios.js";

export const columns = [  // Inside this array, we will define all the columns that we want in the department table
    {
        name: "S.No.",  // Name is what we want to display in the header of the table...`name` is a property
        selector: (row) => row.sno  // This is also a property which tells...what is the name of the property in the database
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({_id, onDepartmentDelete}) => {
    const navigate = useNavigate();

    const API = api;

    const handleDelete = async (_id) => {
        const confirm = window.confirm("Do you want to delete?");
        
        if (confirm){

            try {
                const response = await API.delete(`/departments/${_id}`);
                
                // After deleting, if we not filter the data then it will not automatically render to the frontend
                
                if (response.data.success){
                    onDepartmentDelete?.(_id);
                }
                
            } catch (error) {
                if (error.response && !error.response.data.success){
                    alert(error.response.data.error);
                }
                
            }
        }
    }
        
    return (
        <div className="flex space-x-3">
            
            <button 
                className="px-4 py-1 bg-[#6C63FF] hover:bg-[#5A52E0] text-white rounded-md"
                onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
            >
                Edit
            </button>
            
            <button 
                className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>

        </div>
    )
}