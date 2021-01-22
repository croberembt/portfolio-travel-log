import React, { useState, useEffect } from 'react'; 
import './index.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'; 
import { listLogEntries } from './api'; 


const App = () => {

    const [logEntries, setLogEntries] = useState([]); 

    const [showPopup, setShowPopup] = useState({

    }); 
    
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        zoom: 0
    }); 

    useEffect(() => {
        (async () => {
            const logEntries = await listLogEntries(); 
            setLogEntries(logEntries); 
        })(); 
    }, []); 

    const showAddMarkerPopup = (event) => {
        console.log(event); 
    };

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/calcifer2021/ckjx74nhx1gdc17ncj4gappdq'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
            onDblClick={showAddMarkerPopup}
            >
            {
                logEntries.map(entry => (
                    <>
                        <Marker 
                            key={entry._id} 
                            latitude={entry.latitude} 
                            longitude={entry.longitude} 
                        >
                            <div
                                onClick={() => setShowPopup({
                                    [entry._id]: true
                                })}
                            >
                                <svg 
                                    className='map-marker' 
                                    alt='map marker' 
                                    viewBox='0 0 24 24' 
                                    width='20' 
                                    height='20' 
                                    stroke='#F1D11E' 
                                    strokeWidth='3' fill='none' 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round'>
                                    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                                    <circle cx='12' cy='10' r='3'></circle>
                                </svg>
                            </div>
                        </Marker>
                        {
                            showPopup[entry._id] ? (
                                <Popup
                                    key={entry._id}
                                    dynamicPosition={true}
                                    latitude={entry.latitude}
                                    longitude={entry.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => setShowPopup({})}
                                    anchor='top'
                                >
                                    <div className='container log-details-popup'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div>
                                                    {entry.title}
                                                </div>
                                                <div>
                                                    {entry.description}
                                                </div>
                                                <div>
                                                    {entry.rating}
                                                </div>
                                                <div style={{margin: '1rem', padding: '1rem'}}>
                                                    <img alt={entry.title + 'image'} className='log-image' src={entry.image}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            )
                            : 
                            null
                        }
                    </>
                ))
            }
        </ReactMapGL>
    ); 
}

export default App;
