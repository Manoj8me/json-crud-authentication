import React, { useState } from 'react';

function Registration() {
    const [details, setDetails] = useState({
        id: "",
        password: "",
        fullName: "",
        phone: "",
        email: "",
        country: "",
        address: "",
        gender: "",
    });
    const [error, setError] = useState(""); // State for validation error

    const handleChange = (e) => {
        setDetails((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(`${e.target.name}: ${e.target.value}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Registered Successfully");
            console.log(details);
        }
    };

    const validate = () => {
        if (details.id === "" || details.id === null) {
            setError("Please enter a username"); // Set the error state
            return false;
        } else {
            setError(""); // Clear the error if no issues
            return true;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Registration Form</h4>
                {/* Conditionally render the error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div>
                    <label>UserName</label>
                    <input type="text" value={details.id} name='id' onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={details.password} name="password" onChange={handleChange} />
                </div>
                <div>
                    <label>FullName</label>
                    <input type="text" value={details.fullName} name="fullName" onChange={handleChange} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="tel" value={details.phone} name='phone' onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={details.email} name='email' onChange={handleChange} />
                </div>
                <div>
                    <label>Country</label>
                    <select value={details.country} name='country' onChange={handleChange}>
                        <option value="india">India</option>
                        <option value="USA">USA</option>
                        <option value="singapore">Singapore</option>
                    </select>
                </div>
                <div>
                    <label>Address</label>
                    <textarea value={details.address} name='address' onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Gender</label><br />
                    <label>Male</label>
                    <input type="radio" value="male" name='gender' checked={details.gender === "male"} onChange={handleChange} />
                    <label>Female</label>
                    <input type="radio" value="female" name='gender' checked={details.gender === "female"} onChange={handleChange} />
                </div>
                <button type='submit'>Submit</button>
                <button type="button">Back</button>
            </form>
        </div>
    );
}

export default Registration;
