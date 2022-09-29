import Sidebar from '../../components/Sidebar';
import { useState, createContext } from 'react'
import PLot_list_table from './PLot_list_table';
import Plot_information from './Plot_information';
const PlotContext = createContext();
const Plot_list = () => {
    const [randerType, setRenderType] = useState("list")
    const [plot_data, setPlot_data] = useState(null)
    // let history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         history.push("/all-plots");
    //     }
    //     else {
    //         history.push("/");
    //     }
    // }, []);

    return (
        <div className="container-fluid dashboard-page">
            <div className="row">
                <div className="login-page d-md-flex">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <PlotContext.Provider value={{ randerType, setRenderType, plot_data, setPlot_data }}>
                        {
                            randerType === "info" ? (<Plot_information plot_data={plot_data} />) : (<div className="col-md-8">
                                <div className='book-plot'>
                                    <h1 className='text-center'>List off available plot list</h1>
                                    <PLot_list_table />
                                </div>
                            </div>)
                        }

                    </PlotContext.Provider>
                </div>
            </div>
        </div>
    )
}
export default Plot_list;
export {
    PlotContext
}

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