import React, { useState, useEffect } from 'react'; 
import ReactMapGL, { Marker } from 'react-map-gl'; 
import './index.css';
import { listLogEntries} from './api'; 

const App = () => {

    const [logEntries, setLogEntries] = useState([]); 

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

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/calcifer2021/ckjx74nhx1gdc17ncj4gappdq'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
        >
            {
                logEntries.map(entry => (
                    <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude}>
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="#F1D11E " stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </Marker>
                ))
            }
        </ReactMapGL>
    ); 
}

export default App;