import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EmpDetails() {
  const [empData, setEmpData] = useState({});
  const { empid } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3030/employees/${empid}`)
      .then(res => {
        setEmpData(res.data);
      })
      .catch(err => console.log(err));
  }, [])
  return (
    <div className='container w-50'>
      <div className="card">
        <div className="card-title">
          <h2>Employee Details</h2>
        </div>
        <div className="card-body">
          {
            empData &&
            <div>
              <h5>Employee id is:{empData.id}</h5>
              <h5>Employee name is:{empData.name}</h5>
              <h5>Employee email is:{empData.email}</h5>
              <h5>Employee phone is:{empData.phone}</h5>
              <Link to={"/emp/emplisting"} className='btn btn-danger'>Back to Listing Page</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default EmpDetails