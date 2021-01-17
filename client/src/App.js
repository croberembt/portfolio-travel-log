import React, { useState, useEffect } from 'react'; 
import './index.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'; 
import { Card, CardImg } from 'reactstrap'; 
import { listLogEntries } from './api'; 


const App = () => {

    const [logEntries, setLogEntries] = useState([]); 

    const [showPopup, setShowPopup] = useState({

    }); 

    const [viewport, setViewport] = useState({
        width: '75vw',
        height: '75vh',
        zoom: 0
    }); 

    useEffect(() => {
        (async () => {
            const logEntries = await listLogEntries(); 
            setLogEntries(logEntries); 
        })(); 
    }, []); 

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/calcifer2021/ckjx74nhx1gdc17ncj4gappdq'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
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
                                    ...showPopup,
                                    [entry._id]: true
                                })}
                            >
                                <svg className='map-marker' alt='map marker' viewBox="0 0 24 24" width="20" height="20" stroke="#F1D11E " strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                        </Marker>
                        {
                            showPopup[entry._id] ? (
                                <Popup
                                    latitude={entry.latitude}
                                    longitude={entry.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => this.setState({showPopup: false})}
                                    anchor='top'
                                >
                                    <Card style={{margin: '1rem', padding: '1rem'}}>
                                        <CardImg src={entry.image1}></CardImg>
                                        <CardImg src={entry.image2}></CardImg>
                                        <CardImg src={entry.image3}></CardImg>
                                        <CardImg src={entry.image4}></CardImg>
                                        You are here!
                                    </Card>
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
