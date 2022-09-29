import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../Sidebar';
import axios from 'axios';
import Loading from "../helper_components/Loding"
import { AdminContext } from '../../App';

const UserList = props => {
    const Admin = useContext(AdminContext);
    const [loaded, setLoaded] = useState(false);
    const [gotData, setGotData] = useState(false);
    const [userLists, setUserList] = useState(null);
    const [mode, setMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        admin_email: "",
        // admin_password: "",
        admin_name: "",
        admin_last_name: "",
    })
    // console.log(userLists)

    useEffect(() => {
        const myFun = async () => {
            try {
                const response = await axios.get("http://localhost:8080/advmap/api/api_admin_action", {
                    // method: "get",
                    responseType: "json",
                    headers: {
                        sck: Admin.admin.sck
                    },
                    params: {
                        action_type: "admin_user_list_view",
                        api_key: Admin.admin.admin_key
                    }
                })
                // console.log(response);
                if (response.data) {
                    setLoaded(true);
                    if (response.data.status === "success") {
                        setUserList(response.data.data);
                        setGotData(true);
                    } else {
                        setUserList(response.data.data);
                    }

                } else {
                    alert("can not get users list at this time");
                }
                setMode(false)

            } catch (error) {
                console.log(error);
            }
        }
        myFun();
    }, [gotData])
    const deleteUser = async (e) => {
        const userKey = e.target.id;
        console.log(userKey);
        const confirmation = window.confirm("Are you sure to delete user, this operation will not be revoked");
        if (confirmation) {
            console.log("delete user");
            const response = await axios.delete("http://localhost:8080/advmap/api/api_admin_action", {
                responseType: "json",
                headers: {
                    sck: Admin.admin.sck
                },
                params: {
                    action_type: "admin_user_delete",
                    api_key: Admin.admin.admin_key,
                    admin_user_unique_key: userKey
                }
            })
            // console.log(response);
            if (response.data)
                if (response.data.status === "success") {
                    setGotData(false);
                    setLoaded(false);
                } else {
                    alert("can not delete users at this time");
                    // setUserList(response.data.data);
                }
        } else {
        }


    }
    const UpdateUser = async (e) => {
        try {
            const userKey = e.target.id;
            const updatedUserId = editedUserData._id;
            const updatedUserKey = editedUserData.admin_unique_key;
            if (userKey !== updatedUserKey) {
                console.log("operation performing on non selected user");
                setMode(false);
                return alert("Invalid user update")
            }
            // console.log(mode)
            // console.log(userKey)
            if (userKey === mode) {
                console.log("UpdateUser");
                setMode(false);
                const response = await axios({
                    method: "put",
                    url: "http://localhost:8080/advmap/api/api_admin_action",
                    headers: {
                        sck: Admin.admin.sck
                    },
                    params: {
                        action_type: "admin_user_update",
                        api_key: Admin.admin.admin_key,
                        admin_user_unique_key: userKey,
                        _id: updatedUserId,
                    },
                    data: {
                        admin_name: editedUserData.admin_name,
                        admin_last_name: editedUserData.admin_last_name,
                        admin_email: editedUserData.admin_email,
                        admin_password: null,
                        role: null
                    },
                    responseType: "application/json",
                })
                console.log(response);
                if (response.data) {
                    if (response.data.status === "success") {
                        setLoaded(false);
                        setMode(false);
                        setGotData(false);
                        setUserList(null)
                        console.log("user Updated successfully");
                    } else {
                        alert("user not Updated");
                    }

                } else {
                    console.log("user can not deleted at this time");
                    alert("this user can not be edited")
                }

            } else {
                console.log("user can not identified");
                alert("this user can not be edited");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handelInput = (e) => {
        setEditedUserData((old) => {
            return { ...old, [e.target.name]: e.target.value }
        })
    }

    const CancleUpdatingUser = (e) => {
        setMode(false);
        setEditedUserData({
            admin_email: "",
            admin_password: "",
            admin_name: "",
            admin_last_name: "",
        })
    }
    const handleSetMode = (e) => {
        setMode(e.target.id);
        for (let i = 0; i < userLists.length; i++) {
            const element = userLists[i];
            if (element.admin_unique_key === e.target.id) {
                setEditedUserData({
                    admin_email: element.admin_email,
                    // admin_password: element.admin_password,
                    _id: element._id,
                    admin_unique_key: element.admin_unique_key,
                    admin_name: element.admin_name,
                    admin_last_name: element.admin_last_name,
                })
                break;
            } else {
                continue;
            }

        }
    }
    if (loaded === false) {
        return (<>
            <div className="container-fluid dashboard-page">
                <div className="row">
                    <div className="login-page d-md-flex">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-8">
                            <Loading />
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    if (gotData === true) {
        return (
            <>
                <div className="container-fluid dashboard-page">
                    <div className="row">
                        <div className="login-page user_list d-md-flex">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                            <div className="col-md-8">
                                <div>
                                    <h3 className='text-center mb-3'>Available Users List</h3>
                                </div>
                                <table className="table table-hover table-striped .table-responsive">
                                    <caption>List of users</caption>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope="col">S.NO.</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userLists.map((v, i) => {
                                            if (mode !== false) {
                                                if (mode === v.admin_unique_key) {
                                                    // console.log(editedUserData.admin_last_name)
                                                    return (
                                                        <tr key={i}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td><input className='form-control form-control-lg' type="text" name='admin_name' id='admin_name' value={editedUserData.admin_name} onChange={handelInput} /></td>
                                                            <td><input className='form-control form-control-lg' type="text" name='admin_last_name' id='admin_last_name' value={editedUserData.admin_last_name} onChange={handelInput} /></td>
                                                            <td><input className='form-control form-control-lg' type="email" name='admin_email' id='admin_email' value={editedUserData.admin_email} onChange={handelInput} /></td>
                                                            <td><input type="button" onClick={(e) => { UpdateUser(e) }} id={mode} name="view_information" className='btn btn-dark' defaultValue={"Save"} /></td>
                                                            <td><input type="button" onClick={(e) => { CancleUpdatingUser(e) }} id={mode} name="cancel" className='btn btn-danger' defaultValue={"Cancel"} /></td>
                                                        </tr>
                                                    )
                                                } else {
                                                    return (
                                                        <tr key={i}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{v.admin_name}</td>
                                                            <td>{v.admin_last_name}</td>
                                                            <td>{v.admin_email}</td>
                                                            <td><input type="button" onClick={(e) => { handleSetMode(e) }} id={v.admin_unique_key.toString()} name="view_information" className='btn btn-info' defaultValue={"Edit"} /></td>
                                                            <td><input type="button" onClick={deleteUser} id={v.admin_unique_key.toString()} name="delete_user" className='btn btn-danger bg-danger' defaultValue={"Delete"} /></td>
                                                        </tr>
                                                    )
                                                }

                                            } else {
                                                return (
                                                    <tr key={i}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.admin_name}</td>
                                                        <td>{v.admin_last_name}</td>
                                                        <td>{v.admin_email}</td>
                                                        <td><input type="button" onClick={(e) => { handleSetMode(e) }} id={v.admin_unique_key.toString()} name="view_information" className='btn btn-info' defaultValue={"Edit"} /></td>
                                                        <td><input type="button" onClick={deleteUser} id={v.admin_unique_key.toString()} name="delete_user" className='btn btn-danger bg-danger' defaultValue={"Delete"} /></td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="container-fluid dashboard-page">
                    <div className="row">
                        <div className="login-page d-md-flex">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                            <div className="col-md-8">
                                <p>can not get user data at this time <span> - </span></p>
                                <pre>
                                    {JSON.stringify(userLists)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
    }

}



export default UserList
