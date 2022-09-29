import React, { useContext } from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar';
import { useEffect } from 'react'
import Icon from 'react-icons-kit';
import { eyeClosed } from 'react-icons-kit/oct/eyeClosed'
import { eye } from 'react-icons-kit/oct/eye'
import { BrowserRouter as Link, useHistory } from 'react-router-dom';
import { AdminContext } from "../App";
const Register = () => {
    const Admin = useContext(AdminContext)
    const history = useHistory()
    const [userData, setUserData] = React.useState({
        admin_email: "",
        admin_password: "",
        admin_name: "",
        admin_last_name: "",
        role: "Sub_user"
    })
    useEffect(() => {
        if (!Admin.adminCheck) history.push("/login")
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/advmap/api/api_admin_action?action_type=admin_signup", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                sck: Admin.admin.sck
            },
            body: JSON.stringify({ ...userData })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "user Added");
                if (data.status === "success") {
                    setUserData({
                        admin_email: "",
                        admin_password: "",
                        admin_name: "",
                        admin_last_name: "",
                        role: "Sub_user"
                    });
                    alert(data.message)
                } else if (data.status === "error") {
                    alert(data.message)
                } else {

                }
            });
    }

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeClosed);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeClosed)
            setType('password')
        }
    }
    const handleUserInput = (e) => {
        setUserData((old) => {
            return { ...old, [e.target.name]: e.target.value }
        })
    }
    // console.log(userData);
    return (
        <>
            <div className="container-fluid dashboard-page">
                <div className="row">
                    <div className="login-page d-md-flex">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-8">
                            <section className="bg-image">
                                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                                    <div className="container h-100">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body p-5">
                                                        <h2 className="text-uppercase text-center mb-5">Add User</h2>
                                                        <form onSubmit={handleSubmit}>
                                                            <div className='u-details d-md-flex'>
                                                                <div className="form-outline mb-4 col-md-6">
                                                                    <input type="text" id="fname" name='admin_name' onChange={handleUserInput} className="form-control form-control-lg" placeholder='First Name' />
                                                                </div>
                                                                <div className="form-outline mb-4 col-md-6">
                                                                    <input type="text" id="lname" name="admin_last_name" onChange={handleUserInput} className="form-control form-control-lg" placeholder='Last Name' />
                                                                </div>
                                                            </div>
                                                            <div className="form-outline mb-4">
                                                                <input type="email" name="admin_email" id="form3Example3cg" className="form-control form-control-lg" placeholder='Your Email' value={userData.admin_email} onChange={handleUserInput} />
                                                            </div>
                                                            <div className="mb-3 d-flex set-ic">
                                                                <input
                                                                    type={type}
                                                                    name="admin_password"
                                                                    value={userData.admin_password}
                                                                    className="form-control"
                                                                    placeholder="Enter password"
                                                                    onChange={handleUserInput}

                                                                />
                                                                <span style={{ cursor: "pointer" }} onClick={handleToggle}><Icon icon={icon} size={22} /></span>
                                                            </div>
                                                            {/* <div className='role'>
                                                                <p>Role: Admin</p>
                                                            </div> */}
                                                            <div className="d-flex justify-content-center">
                                                                <input type="submit" value={"Add User"}
                                                                    className="login-signup btn btn-dark py-2 px-3" />
                                                            </div>
                                                            {/* <div className="d-flex justify-content-center">
                                                                <button type="button"
                                                                    className="login-signup">Add</button>
                                                            </div> */}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;