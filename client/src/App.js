import React, { useState, useEffect } from 'react'; 
import ReactMapGL, { Marker } from 'react-map-gl'; 
import './index.css';
import { listLogEntries } from './api'; 
import useModal from './useModal'; 
import LogModalComponent from './components/LogModalComponent'; 
import { Button } from 'reactstrap'; 


const App = () => {

    const {isShowing, toggle} = useModal()

    const [logEntries, setLogEntries] = useState([]); 

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
        <div className='container'>
            <div className='row'>
                    <ReactMapGL
                    {...viewport}
                    mapStyle='mapbox://styles/calcifer2021/ckjx74nhx1gdc17ncj4gappdq'
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={setViewport}
                    >
                        {
                            logEntries.map(entry => (
                                <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude}>
                                    <svg className='map-marker' alt='map marker' viewBox="0 0 24 24" width="20" height="20" stroke="#F1D11E " strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </Marker>
                            ))
                        }
                    </ReactMapGL>
            </div>
            <div className='row'>
                <div>
                    <Button onClick={toggle}>HELLO CLICK ME PLEASE I AM A BUTTON</Button>
                    <LogModalComponent isShowing={isShowing} hide={toggle} />
                </div>
            </div>
        </div>
    ); 
}

export default App;
