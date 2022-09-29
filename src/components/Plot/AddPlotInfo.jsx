import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AdminContext } from '../../App';
import { plotDataContext } from './AddPlot'

const AddPlotInfo = () => {
    const Plot = useContext(plotDataContext);
    const Admin = useContext(AdminContext)

    const [plotInformation, setPlotInformation] = useState({
        plot_no: 0,
        nickname: '',
        scalerank: "",
        zone: "",
        plot_description: "",

    })
    //temporary
    // network_address
    console.log(Admin.admin.admin_key);
    const network_address = [`${Plot.midPoint.geometry.coordinates[0].toFixed(2)},${Plot.midPoint.geometry.coordinates[1].toFixed(2)}`]
    // console.log(network_address);
    const coordinates = Plot.plotFeature.geometry.coordinates;
    const handlePLotAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios({
                method: "post",
                url: "http://localhost:8080/advmap/api/api_admin_action?action_type=admin_add_plot",
                responseType: "json",
                headers: {
                    sck: "1458cxW8sdfqC33383474xfsfw",
                    login_adm_id: Admin.admin.admin_id
                },
                param: {
                    action_type: "admin_add_plot",
                    api_key: Admin.admin.admin_key
                },
                data: {
                    "plot_no": plotInformation.plot_no,
                    "plot_size": Plot.area,
                    "nickname": plotInformation.plot_no,
                    "favicon": "fav url",
                    "logo": "logo url",
                    "zone": plotInformation.zone,
                    "scalerank": plotInformation.scalerank,
                    "featureclass": "Urban area",
                    "plot_description": plotInformation.plot_description,
                    "network_address": network_address,
                    "plot_geometry_shape": "Polygon",
                    "network_shape_address": coordinates
                }
            })
            if (res.data) {
                if (res.data.status === "success") {
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }

            } else {
                alert("Plot Not Added");
            }
        } catch (error) {
            alert("Problem")
            console.log(error)
        }
    }
    const handlePlotInformationInput = e => {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        setPlotInformation(old => ({ ...old, [name]: value }))
    }
    console.log(plotInformation);
    return (
        <>
            <div className="mapInformation p-2 border border-dark m-2">
                <p>Area : {Plot.area}</p>
                <p>Mid Point : {network_address[0]}</p>
            </div>
            <form onSubmit={handlePLotAdd}>
                <label htmlFor="plot_no">Plot No.</label>
                <input onChange={e => handlePlotInformationInput(e)} type="number" name='plot_no' id='plot_no' value={plotInformation.plot_no} />
                <label htmlFor="nickname">Nick Name</label>
                <input onChange={e => handlePlotInformationInput(e)} type="text" name='nickname' id='nickname' value={plotInformation.nickname} />
                <label htmlFor="scalerank">Scalerank</label>
                <input onChange={e => handlePlotInformationInput(e)} type="number" name='scalerank' id='scalerank' value={plotInformation.scalerank} />
                <label htmlFor="zone">Zone Name</label>
                <input onChange={e => handlePlotInformationInput(e)} type="text" name='zone' id='zone' value={plotInformation.zone} />
                <div className="uploadfiles">
                    <label htmlFor="logo">Logo</label>
                    <input type="file" name='logo' id='logo' />
                    <label htmlFor="favicon">Favicon</label>
                    <input type="file" name='favicon' id='favicon' />
                </div>
                <div className="description">
                    {/* <label htmlFor="plot_description">Write Description</label> */}
                    <textarea onChange={e => handlePlotInformationInput(e)} name="plot_description" id="plot_description" cols="30" rows="10" placeholder='Write Description' value={plotInformation.plot_description}></textarea>
                </div>
                <input type="submit" value="Add Plot" />

            </form>
        </>

    )
}

export default AddPlotInfo