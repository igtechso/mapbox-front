import Sidebar from '../components/Sidebar';
import { useEffect } from 'react'
import React from 'react';
import { useHistory } from 'react-router-dom';
const MyProfile = () => {
    // const [admin_email, setAdmin_email] = React.useState("")
    // const [admin_password, setAdmin_password] = React.useState("")
    // let history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         // cookies.set('islogedin', 'Admin',);
    //         // console.log(cookies.get('islogedin'));
    //         history.push("/myprofile");
    //     }
    //     else {
    //         history.push("/");
    //     }
    // }, [history]);


    return (
        <>
            <div className="container-fluid dashboard-page">
                <div className="row">
                    <div className="login-page d-md-flex">

                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-8">

                            <div>
                                <h1>My Profile</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyProfile;