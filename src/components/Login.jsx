import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [details, setDetails] = useState({
        id: "",
        password: "",
    })
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('API URL:', apiUrl);

    useEffect(() => {
        sessionStorage.clear()
    }, [])
    const handleSetDetails = (e) => {
        setDetails(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.get(`${apiUrl}/users/${details.id}`)
                // axios.get(`http://localhost:3030/users/${details.id}`)
                .then(res => {
                    if (res.data.password === details.password) {
                        toast.success("logged in successfully");
                        sessionStorage.setItem("username", details.id);
                        navigate("/emp/emplisting")
                    }
                    else {
                        toast.error("pleae enter correct password");
                    }
                }).catch(err => {
                    if (err.response && err.response.status === 404) {
                        toast.error("please enter correct username")
                    }
                    else {
                        toast.error("Login failed due to" + err);
                    }
                })
        }
    }
    const validate = () => {
        let result = true;
        if (details.id === '' || details.id === null) {
            result = false;
            toast.warning("please enter username");
        }
        if (details.password === '' || details.password === null) {
            result = false;
            toast.warning("please enter password");
        }
        return result;
    }
    return (
        <div>
            <form className='container w-50' onSubmit={handleSubmit}>
                <h2>user login form</h2>
                <div className="form-group">
                    <label>User Name <span className='star-symbol'>*</span></label>
                    <input type="text" value={details.id} onChange={handleSetDetails} name="id" className='form-control' />
                </div>
                <div className="form-group">
                    <label>Password <span className='star-symbol'>*</span></label>
                    <input type="password" value={details.password} onChange={handleSetDetails} name="password" className='form-control' />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
                <Link className='btn btn-success' to={"/registration"}>New User</Link>
            </form>
        </div>
    )
}

export default Login;