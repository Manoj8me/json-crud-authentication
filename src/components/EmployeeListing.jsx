import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function EmployeeListing() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(`${apiUrl}/employees`)
            // axios.get("http://localhost:3030/employees")
            .then(res => setData(res.data))
            .catch(err => "error at" + err)
    }, [])
    const handleEdit = (empid) => {
        navigate(`/emp/edit/${empid}`)
    }
    const handleRemove = (empid) => {
        axios.delete(`${apiUrl}/employees/${empid}`)
            // axios.delete(`http://localhost:3030/employees/${empid}`)
            .then(res => {
                alert("removed successfully");
                window.location.reload();
            })

            .catch(err => console.log(err))
    }
    const handleDetails = (empid) => {
        navigate("/emp/details/" + empid)
    }
    return (
        <div className='container'>
            <Link className='btn btn-danger' to={"/"}>Log Out</Link>
            <h2>Employee Listing Page</h2>
            <Link className='btn btn-success' to={"/emp/create"}>Add New(+)</Link>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <td>id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <a className='btn btn-success' onClick={() => handleEdit(item.id)}>Edit</a>
                                    <a className='btn btn-danger' onClick={() => handleRemove(item.id)}>Remove</a>
                                    <a className='btn btn-primary' onClick={() => handleDetails(item.id)}>Details</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeListing