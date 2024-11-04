import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Registration() {
    const [details, setDetails] = useState({
        id: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        country: "india",
        gender: "male",
        address: "",
    })
    const navigate = useNavigate();
    const handleSetDetails = (e) =>
        setDetails(prevstate => ({
            ...prevstate, [e.target.name]: e.target.value
        }));
    const isValidate = () => {
        let isProceed = true;
        let errorMessage = "please enter the value in "
        if (details.id === "" || details.id === null) {
            isProceed = false;
            errorMessage += "Username";
        }
        if (details.password === "" || details.password === null) {
            isProceed = false;
            errorMessage += " Password";
        }
        if (details.name === "" || details.name === null) {
            isProceed = false;
            errorMessage += " Fullname";
        }
        if (details.email === "" || details.email === null) {
            isProceed = false;
            errorMessage += " Email";
        }
        if (details.phone === "" || details.phone === null) {
            isProceed = false;
            errorMessage += " Phone Number";
        }
        if (details.address === "" || details.address === null) {
            isProceed = false;
            errorMessage += " Address";
        }
        if (!isProceed) {
            toast.warning(errorMessage);
        }
        return isProceed;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(details)
        if (isValidate()) {
            axios.post("http://localhost:3030/users", details)
                .then(res => { toast.success("Registered successfully"); navigate("/") })
                .catch(err => toast.success("failed" + err));
        }
    }
    return (
        <div>
            <form className='container w-50' onSubmit={handleSubmit}>
                <h2>Registeration Form</h2>
                <div className="form-group">
                    <label>Username <span className='star-symbol'>*</span></label>
                    <input type="text" className='form-control' name='id' value={details.id} onChange={handleSetDetails} />
                </div>
                <div className="form-group"><label>Password <span className='star-symbol'>*</span></label>
                    <input type="password" className='form-control' name='password' value={details.password} onChange={handleSetDetails} />
                </div>
                <div className="form-group">
                    <label>Full Name <span className='star-symbol'>*</span></label>
                    <input type="text" className='form-control' name='name' value={details.name} onChange={handleSetDetails} />
                </div>
                <div className="form-group">
                    <label>Email <span className='star-symbol'>*</span></label>
                    <input type="text" className='form-control' name='email' value={details.email} onChange={handleSetDetails} />
                </div>
                <div className="form-group">
                    <label>Phone <span className='star-symbol'>*</span></label>
                    <input type="text" className='form-control' name='phone' value={details.phone} onChange={handleSetDetails} />
                </div>
                <div className="form-group">
                    <label>Country <span className="star-symbol">*</span></label>
                    <select name="country" className='form-control' value={details.country} onChange={handleSetDetails}>
                        <option value="india">India</option>
                        <option value="usa">USA</option>
                        <option value="singapore">Singapore</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address<span className='star-symbol'>*</span></label>
                    <textarea value={details.address} name="address" className='form-control' onChange={handleSetDetails} />
                </div>
                <div className="form-group">
                    <label>Gender</label><br />
                    <input type="radio" value="male" name="gender" checked={details.gender === "male"} onChange={handleSetDetails} className='app-check' />
                    <label>Male</label>
                    <input type="radio" value="female" name="gender" checked={details.gender === "female"} onChange={handleSetDetails} className='app-check' />
                    <label>Female</label>
                </div>
                <button className='btn btn-primary'>Submit</button>
                <Link className='btn btn-danger' to={"/"}>Back</Link>
            </form>
        </div>
    )
}

export default Registration