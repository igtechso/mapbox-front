import Sidebar from '../components/Sidebar';
import { useEffect, createContext, useState, useContext } from 'react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Plot_information from "./Plot/Plot_information"
const PlotContext = createContext();
import { AdminContext } from '../App';
const Plots = () => {
    const Admin = useContext(AdminContext)
    let history = useHistory();

    useEffect(() => {
        if (!Admin.adminCheck) history.push("/login")
    }, [])

    return (
        <PlotContext.Provider value={{ randerType, setRenderType }}>
            <div className="container-fluid dashboard-page">
                <div className="row">
                    <div className="login-page d-md-flex">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        {
                            randerType !== "info" ? <Plot_information /> : (
                                <div className="col-md-8">
                                    <div className='book-plot'>
                                        <h1 className='text-center'>Here All Plots Will Be Shown</h1>
                                        {/* <form >
                                    
                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example3cg" className="form-control form-control-lg" placeholder='Latitude'  />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example4cg" className="form-control form-control-lg" placeholder='Longitude'  />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="button"
                                            className="login-signup">Add</button>
                                    </div>
                                </form> */}
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </PlotContext.Provider>
    )
}
export default Plots;