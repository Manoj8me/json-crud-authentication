import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function EmpCreate() {
  const [details, setDetails] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  })
  const navigate = useNavigate();
  const handleSetDetails = (e) => {
    const { name, value } = e.target;
    setDetails(prevState => ({
      ...prevState, [name]: value
    }))
  }
  const handleSubmit = (e) => {
    const { name, email, phone } = details;
    const detailsWithoutId = { name, email, phone };
    e.preventDefault();
    axios.post("http://localhost:3030/employees", detailsWithoutId)
      .then(res => {
        alert("data posted successfullly");
        navigate("/emp/emplisting")
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <form className='container w-50' onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>
          <input type="text" disabled
            value={details.id} name='id' onChange={handleSetDetails} className="form-control" />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={details.name} name='name' onChange={handleSetDetails} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={details.email} name='email' onChange={handleSetDetails} className="form-control" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" value={details.phone} name='phone' onChange={handleSetDetails} className="form-control" />
        </div>
        <button type='submit' className='btn btn-success'>Save</button>
        <Link className='btn btn-danger' to={"/emp/emplisting"}>Back</Link>
      </form>
    </div>
  )
}

export default EmpCreate