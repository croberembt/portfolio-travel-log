import React, { useState, useEffect } from 'react'; 
import './index.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'; 
import { listLogEntries } from './api'; 
import LogEntryComponent from './components/LogEntryComponent'; 
import { Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap'; 

const App = () => {

  const [logEntries, setLogEntries] = useState([]); 

  const [showPopup, setShowPopup] = useState({}); 

  const [addEntryLocation, setAddEntryLocation] = useState(null); 
  
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    zoom: 0
  }); 

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries(); 
  }, []); 

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat; 
    setAddEntryLocation({
      latitude,
      longitude
    });
  };

  return (
    <div> 
      {/*the mapStyle below is pulling the style from a custom style I created on Mapbox -- using public access token - onDblClick is a built in mapbox function*/}
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/calcifer2021/ckjx74nhx1gdc17ncj4gappdq' 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
      >
        {
          logEntries.map(entry => (
            <React.Fragment key={entry._id}>
              {/*the offset below centers the marker svg based on the 20px size of the svg*/}
              <Marker 
                latitude={entry.latitude} 
                longitude={entry.longitude} 
                offsetLeft={-10}
                offsetTop={-25}
              >
                {/*the onclick below only pulls up the popup associated with the entry id*/}
                <div
                  onClick={() => setShowPopup({
                      [entry._id]: true
                  })}
                >
                  <svg 
                    className='post-entry-marker' 
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
                    className='popup'
                    dynamicPosition={true}
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup({})}
                    anchor='top'
                    maxWidth='none'
                  >
                    <Card className='log-card text-center' style={{margin: '2rem'}}>
                      <CardBody>
                        <CardTitle><h4>{entry.title}</h4></CardTitle>
                        {
                          entry.image ? 
                            <CardImg style={{marginTop: '.5rem', marginBottom: '.5rem'}} alt={entry.title} className='log-image' src={entry.image} />
                          : 
                          null
                        }
                        <CardSubtitle style={{marginTop: '1rem', marginBottom: '1rem'}}>{entry.description}</CardSubtitle>
                        {
                          entry.vacation_rating ? 
                          <CardSubtitle style={{marginTop: '.5rem'}}><h5>Rating: {entry.vacation_rating}/10</h5></CardSubtitle>
                          :
                          null
                        }   
                        </CardBody>
                      </Card>
                  </Popup>
                )
                : 
                null
              }
            </React.Fragment>
          ))
        }
        {
          addEntryLocation ? (
            <div>
              <Marker 
                latitude={addEntryLocation.latitude} 
                longitude={addEntryLocation.longitude} 
                offsetLeft={-10}
                offsetTop={-25}
              >
                <div>
                    <svg 
                        className='pre-entry-marker' 
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
              <Popup
                  className='popup'
                  dynamicPosition={true}
                  latitude={addEntryLocation.latitude}
                  longitude={addEntryLocation.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setAddEntryLocation(null)}
                  anchor='top'
              >
                <div className='popup-form'>
                    <LogEntryComponent 
                      onClose={() => {
                        setAddEntryLocation(null); 
                        getEntries(); 
                      }}
                      location={addEntryLocation}
                    />
                </div>
              </Popup>
            </div>
          ) :
          null
        }
      </ReactMapGL>
    </div>
  ); 
}

export default App;
