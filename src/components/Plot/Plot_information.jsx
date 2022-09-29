import React, { useState, useContext, useEffect } from 'react'
import { PlotContext } from "./Plot_list";
import axios from 'axios';
import Loading from "../helper_components/Loding"
import User_list_for_assign from './lists/User_list_for_assign';
import { AdminContext } from '../../App';


const Plot_information = (props) => {
    const Plot_list = useContext(PlotContext);
    const Admin = useContext(AdminContext);
    const [assign, setAssign] = useState(false);
    const [information, setInforamtion] = useState({
        plot_id: props.plot_data.plot_id,
        plot_key: props.plot_data.plot_key,
    })
    const [popup, setPopup] = useState(false);
    const [plotData, setPLotData] = useState(null)

    // ********************************************** *//
    if (!(information.plot_id || information.plot_key)) {///important
        Plot_list.setRenderType("list");
    }
    // ********************************************** *//
    //api call for a single plot
    useEffect(() => {
        const myFun = async () => {
            try {
                // console.log("hello")
                const response = await axios({
                    method: "get",
                    url: "http://localhost:8080/advmap/api/api_admin_action",
                    responseType: "json",
                    headers: {
                        sck: Admin.admin.sck,//should be dynamic
                        admin_id: Admin.admin.admin_id
                    },
                    params: {
                        admin_unique_key: Admin.admin.admin_key,//should be dynamic
                        action_type: "admin_plot_list",
                        plot_list_method: "TYPE",
                        plot_list_by_type: "_id",
                        plot_list_type_value: information.plot_id,
                    }
                })
                // console.log(response);
                if (response.data) {
                    // console.log(response.data)
                    if (response.data.status === "success") {
                        setPLotData(response.data.data[0]);
                    } else { }
                } else {
                    alert("can not get users list at this time");
                }
            } catch (error) {
                console.log(error)
            }
        }
        myFun()
        // ********************************** //

    }, [])

    if (plotData === null) {
        return (
            <div className="contanier">
                <div className="controller">
                    <input defaultValue={"< Back"} className="btn bg-info mb-3" onClick={() => Plot_list.setRenderType("list")} />
                </div>
                <div className="inforamtion">
                    <Loading />
                </div>
            </div>)
    }
    // console.log(plotData);
    return (

        <div className="col-md-8" style={{ height: "100vh !important" }}>
            <div className="d-flex flex-column">
                <input defaultValue={"< Back"} className="btn bg-info mb-3" onClick={() => Plot_list.setRenderType("list")} />
                {/* <div className="assignedUserInfo active">
                    <input className='btn btn-dark' type="button" onClick={() => { setPopup("") }} defaultValue="Close" />
                    <table className='table'>
                        <thead>
                            <tr className='row'>
                                <th className='col'>Name</th>
                                <th className='col'>Last Name</th>
                                <th className='col'>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='row'>
                                <td className='col'>Namay</td>
                                <td className='col'>goswmai</td>
                                <td className='col'>test@email.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
            <div className=''>
                <div className="plotInformation">
                    <div className="basic d-flex flex-column ">
                        <h3>Plot Information</h3>
                        <p>S.No. : {plotData.properties.plot_no}</p>
                        <p>Area : {plotData.properties.area_sqkm}</p>
                        <p>Nickname : {plotData.properties.nickname}</p>
                        <p>Scalerank : {plotData.properties.scalerank}</p>
                        <p>Status : {plotData.properties.status}</p>
                        <p>Zone : {plotData.properties.zone}</p>
                    </div>
                </div>
                <div className="plot_assign">
                    <h3>Plot Assign</h3>
                    <input type={"button"} defaultValue={assign ? "Hide users list" : "Show users list"} className='btn btn-dark mb-2' onClick={() => { setAssign((old) => { return !old }) }} />
                    {

                        assign === true ? (
                            <User_list_for_assign />
                        ) : ""
                    }


                </div>
            </div>
        </div>
    )


}

export default Plot_information