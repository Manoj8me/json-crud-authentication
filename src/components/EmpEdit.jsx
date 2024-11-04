import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function EmpEdit() {
  const [details, setDetails] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  })
  const navigate = useNavigate();
  const { empid } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3030/employees/${empid}`)
      .then(res => setDetails({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      }))
      .catch(err => console.log(err))
  }, [])
  const handleSetDetails = (e) => {
    const { name, value } = e.target;
    setDetails(prevState => ({
      ...prevState, [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/employees/${empid}`, details)
      .then(res => {
        alert("data edited successfullly");
        navigate("/emp/emplisting")
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <form className='container w-50'
        onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>
          <input type="text" disabled value={details.id} name='id' onChange={handleSetDetails} className="form-control" />
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

export default EmpEdit