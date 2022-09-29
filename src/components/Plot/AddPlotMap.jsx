import React, { useContext, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import mapboxGLDrawRectangleDrag from 'mapboxgl-draw-rectangle-drag';
import { plotDataContext } from "./AddPlot"

const AddPlotMap = () => {
    const Plot = useContext(plotDataContext)
    // const [lng, setLng] = useState(-74.6002);
    // const [lat, setLat] = useState(41.1676);
    const [zoom, setZoom] = useState(5);
    const mapContainerRef = useRef(null);
    React.useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibXl0ZXN0ZGVtbzEiLCJhIjoiY2w2aG41dWQyMTJ2ejNkb3Ixd2cxc281ZCJ9.7vialU9U5Weth8DXYhW60Q';
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mytestdemo1/cl6hpgqr0002m14nsf78tqr6d',
            center: [-74.6002, 41.1676],
            zoom: zoom,
            minZoom: 3,
            maxZoom: 50,
        });
        map.on('load', () => {
            map.addSource('radar', {
                'type': 'image',
                'url': 'https://www.titansofprint.com/wp-content/uploads/2022/08/Map-Pixels-1.png',
                'coordinates': [
                    [-80.425, 46.437],
                    [-71.516, 46.437],
                    [-71.516, 37.936],
                    [-80.425, 37.936]
                ]
            });
            map.addLayer({
                id: 'radar-layer',
                'type': 'raster',
                'source': 'radar',
                'paint': {
                    'raster-fade-duration': 0
                }
            });
            // map.addLayer(highlightLayer, 'building');
        });
        const nav = new mapboxgl.NavigationControl({
            showCompass: true
        });
        map.addControl(nav, 'top-left');
        const modes = MapboxDraw.modes;
        modes.draw_rectangle = mapboxGLDrawRectangleDrag;
        const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                // line_string: true,
                polygon: true,
                trash: true
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon'
        });

        // console.log(draw);
        map.addControl(draw);
        function updateArea(e) {
            const data = draw.getAll();
            // console.log(data);
            // console.log(e);
            if (e.type === 'draw.delete') { Plot.setArea(""); Plot.setPlotFeatures(null); Plot.setMidPoint(null) }
            if (e.features[0].geometry.type === "LineString") {
                //We can use linestring for genrating rectangle
                return alert("This feature will available soon")
            }
            if (data.features.length > 0) {
                if (data.features.length > 1) {
                    draw.delete(data.features[1].id);
                    alert("Please select only single area at a time");
                    return
                }
                // Restrict the area to 2 decimal points.
                // we can select area according to our need.
                // Calculate midpoint with turf

                const area = turf.area(data.features[0]);
                // console.log(data.features[0].geometry.coordinates);

                var polygon = turf.polygon(data.features[0].geometry.coordinates);
                var pointOnPolygon = turf.pointOnFeature(polygon);
                Plot.setMidPoint(pointOnPolygon);
                Plot.setArea(Math.round(area * 100) / 100);
                Plot.setPlotFeatures(data.features[0]);
            } else {
                Plot.setArea("");
                Plot.setMidPoint(null);
                Plot.setPlotFeatures(null);
                if (e.type !== 'draw.delete') {
                    alert('Click the map to draw a polygon.');
                }
            }
        }
        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        // add the custom style layer to the map
        return () => map.remove();
    }, [])
    // console.log("Plot Features - \n", Plot);
    return (<>
        <div className='map' ref={mapContainerRef} ></div>
        <div id='calculated-area' >
            <div className="plot_area px-5 py-3">
                <h3 className='py-1 border-bottom border-dark'>Plot Information</h3>
                <p><strong>Area</strong> : {Plot.area} Square meter</p>
            </div>
            <div className="plotLocations">
                <ul className='list'>
                    {Plot.plotFeature !== null ? (Plot.plotFeature.geometry.coordinates.map((v, i) => {
                        if (v.length > 0) {
                            // console.log(v);
                            return v.map((v, i) => {
                                return <li className='list-group-item' key={i.toString()}>{i + 1} - <strong>Latitude : </strong><span>{v[0]}</span> and <strong>Longitude : </strong><span>{v[1]}</span> </li>
                            })
                        } else {
                            console.log(v);
                            return <li className='list-group-item'>hello</li>
                        }
                    })) : (<li className='list-group-item'>Please Select an Area</li>)}
                </ul>
            </div>
        </div>
    </>
    )
}

export default AddPlotMap