import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Loading from "../helper_components/Loding";
import axios from 'axios';
import { PlotContext } from "./Plot_list";
import { AdminContext } from '../../App';
const PLot_list_table = (props) => {
    const Admin = useContext(AdminContext)
    const [pageInfo, setPageInfo] = useState({
        loaded: false,
        gotData: false,
        plotList: null
    });
    const PLot = useContext(PlotContext);
    useEffect(() => {
        const myFun = async (props) => {
            try {
                // console.log("hello")
                const response = await axios.get("http://localhost:8080/advmap/api/api_admin_action", {
                    responseType: "json",
                    headers: {
                        sck: Admin.admin.sck,//should be dynamic
                        admin_id: Admin.admin.admin_id,//should be dynamic
                    },
                    params: {
                        action_type: "admin_plot_list",
                        admin_unique_key: Admin.admin.admin_key,//should be dynamic
                        plot_list_method: "ALL",
                        // plot_list_by_type: plotListInfo.plot_list_by_type,
                        // plot_list_type_value: plotListInfo.list_type_value,
                    }
                })
                // console.log(response);
                if (response.data) {
                    // console.log(response.data)
                    if (response.data.status === "success") {
                        setPageInfo((old) => {
                            return { ...old, loaded: true, gotData: true, plotList: response.data.data }
                        });
                    } else { }
                } else {
                    alert("can not get users list at this time");
                }
            } catch (error) {
                console.log(error)
            }
        }
        myFun(props);
    }, []);
    const handle_view_user = (e) => {
        // console.log(e.target);
        const dataset = e.currentTarget.dataset
        PLot.setPlot_data({ plot_key: dataset.plot_key, plot_id: dataset.plot_id });
        PLot.setRenderType("info");
    }


    if (pageInfo.loaded === false) {
        return <Loading />
    } else if (pageInfo.gotData === false) {
        return <p>not not available</p>
    }
    return (
        <>

            <table className="table table-hover table-striped .table-responsive">
                <caption>List of Plots</caption>
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Plot NO.</th>
                        <th scope="col">Nick name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Zone</th>
                        <th scope="col">Shape</th>
                        <th scope="col">Scalerank</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        // console.log(e.currentTarget.dataset)
                        pageInfo.plotList.map((v, i) => {
                            return (
                                <tr key={i.toString()} onClick={(e) => { handle_view_user(e) }} id="plot_list" data-plot_key={v.properties.plot_unique_key} data-plot_id={v.properties._id}>
                                    <th scope="col">{i + 1}</th>
                                    <th scope="col">{v.properties.plot_no}</th>
                                    <th scope="col">{v.properties.nickname}</th>
                                    <th scope="col">{v.properties.status}</th>
                                    <th scope="col">{v.properties.zone}</th>
                                    <th scope="col">{v.geometry.type}</th>
                                    <th scope="col">{v.properties.scalerank}</th>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
        </>
    )
}

export default PLot_list_table