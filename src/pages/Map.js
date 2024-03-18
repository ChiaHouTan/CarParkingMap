import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import Papa from 'papaparse';
<<<<<<< HEAD
//import { PubNubProvider, usePubNub } from 'pubnub-react';

// const pubnub = new PubNub({
//     publishKey: process.env.REACT_APP_PUBLISHKEY,
//     subscribeKey: process.env.REACT_APP_SUBSCRIBEKEY,
//     uuid: process.env.REACT_APP_UUID
//   });
=======
>>>>>>> e2994d49b429394840ac2324f3e1412de9c26650

export default function Map() {
    const [rectangles, setRectangles] = useState([]);
    const [selectedRect, setSelectedRect] = useState(null);

<<<<<<< HEAD
        // useEffect(() => {
=======
        // const pubnub = new PubNub({
        //     subscribeKey: '',
        //     uuid: ''
        //   });
>>>>>>> e2994d49b429394840ac2324f3e1412de9c26650

        // const pubnub = new PubNub({
        //     subscribeKey: process.env.REACT_APP_SUBSCRIBEKEY,
        //     uuid: 'parktesting'
        //   });

        // pubnub.subscribe({
        //     channels: [process.env.REACT_APP_CHANNEL],
        //   });
        
        //   pubnub.addListener({
        //     message: (message) => {
        //       // Assuming the message format is { ids: [id1, id2, ...], booleans: [bool1, bool2, ...] }
        //       const { id_list, boolean_values } = message.message;
      
        //       // Update state based on the received message
        //       const updatedRectangles = rectangles.map((rect) => {
        //         const index = id_list.indexOf(rect.id);
        //         const isBlueID = ['B247', 'B248', 'B249', 'B250', 'B251', 'B252'].includes(rect.id);
        //         // Convert the Python boolean value to lowercase in JavaScript
        //         const lowerCaseBoolean = boolean_values[index] ? 'true' : 'false';
      
        //         if (isBlueID) {
        //             // Set blue color for specific IDs
        //             rect.color = lowerCaseBoolean === 'true' ? 'lightskyblue' : 'red';
        //           } else {
        //           // Change the color based on the boolean value
        //           rect.color = lowerCaseBoolean === 'true' ? 'limegreen' : 'red';
        //         }
      
        //         return rect;
        //       });
      
        //       setRectangles(updatedRectangles);
        //     },
        //   });

        //   return () => {
        //     pubnub.unsubscribeAll();
        //     pubnub.stop();
        //   };
        // }, [rectangles]);

        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await fetch('/data/allXYReact.csv'); // Update the path accordingly
                const csvData = await response.text();
        
                // Parse CSV data using papaparse
                Papa.parse(csvData, {
                  header: true,
                  dynamicTyping: true,
                  complete: (result) => {
                    const initialRectangles = result.data.map(({ id, x1, y1, lat, lng }) => {
                        let color;
                        let w;
                        let h;

                        if (id && typeof id === 'string' && parseInt(id.substring(1)) >= 137 && parseInt(id.substring(1)) <= 139) {
                            color = 'limegreen';
                            w = 69;  // Set a different color for the specified range
                            h = 23;
                        } else if (id && typeof id === 'string' && parseInt(id.substring(1)) >= 247 && parseInt(id.substring(1)) <= 252){
                            color = 'lightskyblue';
                            w = 25;
                            h = 32;
                        } else {
                            color = 'limegreen';
                            w = 27;
                            h = 32;
                        }

                        return {
                            id,
                            x1,
                            y1,
                            w,
                            h,
                            color,
                            lat,
                            lng,
                                };
                    });
                    
                    // Initialize the state with initial rectangles
                    setRectangles(initialRectangles);
                  },
                });
              } catch (error) {
                console.error('Error fetching or parsing data:', error);
              }
            };
        
            fetchData();
          }, []);


          // const handleRectClick = (destLat, destLng) => {
          //   // Check if the browser supports the Geolocation API
          //   if (navigator.geolocation) {
          //     navigator.geolocation.getCurrentPosition(
          //       (position) => {
          //         const { latitude, longitude } = position.coords;
          //         const googleMapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${destLat},${destLng}`;
          //         window.location.href = googleMapsUrl;
          //       },
          //       (error) => {
          //         console.error('Error getting current location:', error);
          //       }
          //     );
          //   } else {
          //     console.error('Geolocation is not supported by your browser');
          //   }
          // };

          const handleRectClick = (rect) => {
            setSelectedRect(rect);
          };
        
          const handleClosePopUp = () => {
            setSelectedRect(null);
          };

          const handleButtonClick = (destLat, destLng) => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;
          
            // Check if it's a mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          
            if (isMobile) {
              window.location.href = googleMapsUrl;
            } else {
              // If not on a mobile device, provide a fallback behavior (e.g., open in a new tab)
              window.open(googleMapsUrl, '_blank');
            }
          };

          const handleBackClick = () => {
                const url = '/';
                // Change the URL of the current window
                window.location.href = url;
        };



    return <>
                <main className="main">
                <section className="section">
                    <div className="parking-area">
                
                    <svg className='cpMap'>
                    {/* <rect width="100" height="100" x="10" y="10" rx="20" ry="20" fill="blue" onClick={() => handleClick(53.982286, -6.392322)}/> */}
                    {rectangles.map((rect) => (
                     <rect
                    key={rect.id}
                    id={rect.id}
                    x={rect.x1}
                    y={rect.y1}
                    width={rect.w}
                    height={rect.h}
                    fill={rect.color}
                    onClick={() => handleRectClick(rect)}
                    />
      ))}
                    </svg>
                
                    <button className="circle-button" onClick={handleBackClick}>X</button>    
            </div>
            
        </section>
        </main>
        {selectedRect && (
        <div className="popup-box" onClick={handleClosePopUp}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>{selectedRect.id}</p>
            <button onClick={() => handleButtonClick(selectedRect.lat, selectedRect.lng)}>Guide</button>
            <button onClick={handleClosePopUp}>Close</button>
          </div>
        </div>
      )}
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    
    
    
    </>
}
