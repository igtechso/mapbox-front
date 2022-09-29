import React, { createContext, useState } from 'react'
import { Coordinate } from '../Coordinate';
import Sidebar from '../Sidebar';
import AddPlotMap from './AddPlotMap';
import AddPlotInfo from './AddPlotInfo';
import "./add_plot.css"

//can be used to draw user selected area
const tempLocation = {
    "type": "Feature",
    "properties": {
        "scalerank": 0,
        "area_sqkm": 0,
        "featureclass": "Urban area"
    },
    "geometry": {
        "type": "",
        "coordinates": []
    }
};

export const plotDataContext = createContext();

const AddPlot = () => {
    const [stepNo, setStepNo] = useState(0)//max 2 step, here is 1 for state
    //location fetch by api to show plot on map
    const [locationsOnMap, setLocationsOnMap] = useState(Coordinate)//this is dynamic fetched from api, currently static
    const [area, setArea] = useState("")
    const [midPoint, setMidPoint] = useState(null)
    const [plotFeature, setPlotFeatures] = useState(null);
    console.log("mid point", midPoint);
    React.useEffect(() => {
        console.log("map loaded")
        // setLocationsOnMap() //data fetched from api 
        return () => {
            // setLocationsOnMap(null);
        }
    }, [])

    // const [step, setStep] = useState(0);
    // console.log(locations.length);
    // const [maxLocations, setMaxLocations] = useState("")// 4 for rectangle which is default selected

    const handleSteps = (e) => {
        const action = e.target.name;
        if (action === "next") {
            if (plotFeature === null) return alert("Please Select An Area before Step Two");
            setStepNo(old => {
                if (old > 1) {
                    return old - 1
                } else {
                    return old === 1 ? old : ++old;
                }
            })
        } else if (action === "previous") {
            setStepNo(old => {
                if (old <= 0) {
                    return old
                } else {
                    return --old
                }
            })
        } else {
            console.log("Invalid action")
        }
        console.log(action);
    }

    // console.log("plotFeature - ", drawUserSelectedArea);//In future we can validate location slected by user is valid or not
    return (
        <plotDataContext.Provider value={{ plotFeature, setPlotFeatures, area, setArea, midPoint, setMidPoint }}>
            <div className="container-fluid dashboard-page">
                <div className="row">
                    <div className="login-page d-md-flex">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="main_box col-md-9">
                            <h2>Add Plot</h2>
                            <div className="steps_container">
                                <div className="info_about_steps">
                                    <div className="">
                                        <div className="info"><span>Step No. - </span>{stepNo + 1}</div>
                                        <div className="stepName">{stepNo === 0 ? "Select Area From map" : "Fill Information"}</div>
                                    </div>
                                    <div className="navigate"><input name="previous" type="button" defaultValue={"Prev Step"} onClick={handleSteps} /><input name="next" type="button" defaultValue={"Next Step"} onClick={handleSteps} /></div>
                                </div>
                                <div className="stepsContainer">
                                    <div className="locationSelector">
                                        <div className="map add_plot">
                                            {stepNo === 0 ? <AddPlotMap /> : <AddPlotInfo />}

                                            {/* required - getOnlyLocations true to run get map location*/}
                                        </div>
                                    </div>
                                    <div className="selectedLocations" >

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </plotDataContext.Provider>
    )

}

export default AddPlot