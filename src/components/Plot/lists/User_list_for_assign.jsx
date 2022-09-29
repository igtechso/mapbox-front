import React, { useState, useContext } from 'react'
import Axios from "axios";
import { AdminContext } from '../../../App';
import { PlotContext } from "../Plot_list";
import assign_user from '../../helper_functions/assign_user';
const User_list_for_assign = (props) => {
    const Admin = useContext(AdminContext);
    const [users, setUsers] = useState(null);
    const [load, setLoad] = useState(false);
    const Plot = useContext(PlotContext);
    const [popup, setPopup] = useState(false);//for popup
    const [popupMsg, setPopupMsg] = useState("");
    const [assignedUser, setAssignedUser] = useState(null);
    // console.log(users)
    React.useEffect(() => {
        const myFun = async (method) => {
            try {
                const response = await Axios.get("http://localhost:8080/advmap/api/api_admin_action", {
                    // method: "get",
                    responseType: "json",
                    headers: {
                        sck: Admin.admin.sck
                    },
                    params: {
                        action_type: "admin_user_list_view",
                        api_key: Admin.admin.admin_key,
                    }
                })
                // console.log(response);
                if (response.data) {
                    if (response.data.status === "success") {
                        setUsers(response.data.data);
                        setLoad(true)
                    } else {
                        setUsers(null);
                    }
                } else { setUsers(null); alert("can not get users list at this time"); }
            } catch (error) { console.log(error); }

        }
        myFun("filter");
    }, [])
    // console.log("Plot Unique", Plot);
    const assignUser = async (e) => {
        const dataset = e.target.offsetParent.dataset
        const userIds = { user_id: dataset.user_id, user_key: dataset.user_key };
        // console.log(userIds)
        if (window.confirm("are you sure to assign plot to this user")) {
            const result = await assign_user({ userIds, plot: Plot.plot_data, admin: { id: Admin.admin.admin_id, api_key: Admin.admin.admin_key }, sck: Admin.admin.sck });
            if (result.status === true) {
                setAssignedUser(result.data);
                setPopup(true)
                setPopupMsg("user assigned successfully")
                console.log(result.data);
                // alert("User assigned successfully");
            } else {
                setPopup(true)
                setPopupMsg(result.message)
            }
        }
    }

    if (load === false) return <p>loading</p>
    if (users === null) return <p>can not get users list</p>
    return (
        <ul className='list-group'>
            {
                users.map((v, i) => {
                    return <li style={{ padding: "16px" }} className='list-group-item d-flex justify-content-between p-3 m-1' key={i.toString()} data-user_name={v.admin_name} data-user_id={v._id} data-user_key={v.admin_unique_key}>
                        <span>Name : {v.admin_name} | Email : {v.admin_email}</span>
                        <div className="right">
                            <input className='btn btn-dark' defaultValue={"Assign User"} type="button" onClick={(e) => { assignUser(e); }} />
                        </div>
                    </li>
                })
            }


        </ul>

    )
}

export default User_list_for_assign;