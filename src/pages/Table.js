import { useEffect, useState } from "react";
import axios from 'axios'
import {Buffer} from 'buffer';
Buffer.from('anything','base64');


export default function Table() {
    const [car, setCarData] = useState([]);
    const [camera_Image2, setTablea2Data] = useState([]);
    const [parking_space, setTablea3Data] = useState([]);
    const [selectedTable, setSelectedTable] = useState('table1');

    useEffect(() =>{
        axios.get('http://localhost:3001/getCar')
        .then(car => setCarData(car.data))
        .catch(err => console.log(err))
    }, [])

    
    
    useEffect(() =>{
        axios.get('http://localhost:3001/getCameraImages2')
        .then(camera_Image2 => setTablea2Data(camera_Image2.data))
        .catch(err => console.log(err))
    }, [])


    useEffect(() =>{
        axios.get('http://localhost:3001/getParkingSpace')
        .then(parking_space => setTablea3Data(parking_space.data))
        .catch(err => console.log(err))
    }, [])


      
        const showTable = (event) => {
          setSelectedTable(event.target.value);
        };


    return <>
        <div className="table-container">
        <h1>Table</h1>
        <label htmlFor="tableSelector">Select a Table:</label>
        <select id="tableSelector" value={selectedTable} onChange={showTable}>
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
        </select>
        
                <div id="table1" style={{ display: selectedTable === 'table1' ? 'block' : 'none' }}>
                    <table className="tableCenter">
                        <thead>
                            <tr>
                                <th>
                                    Car_ID
                                </th>
                                <th>
                                    License_plate
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                car.map(c => {
                                    return <tr>
                                        <td>{c.car_id}</td>
                                        <td>{c.license_plate}</td> 
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div id="table2" style={{ display: selectedTable === 'table2' ? 'block' : 'none' }}>
                    <table className="tableCenter">
                        <thead>
                            <tr>
                                <th>
                                Time
                                </th>
                                <th>
                                    Motion Detect
                                </th>
                                <th>
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                camera_Image2.map(t2 => {
                                    return <tr>
                                        <td>{t2.timestamp}</td>
                                        <td>{t2.motion_detected ? 'Motion Detected' : 'No Motion Detected'}</td>
                                        <td>
                                        {t2.image_data && (
                                        <img
                                            src={`data:image/jpeg;base64,${Buffer.from(t2.image_data).toString('base64')}`}
                                            alt="Camera Image"
                                            width="100"
                                            height="100"
                                        />
                                        )}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div id="table3" style={{ display: selectedTable === 'table3' ? 'block' : 'none' }}>
                    <table className="tableCenter">
                        <thead>
                            <tr>
                                <th>
                                    Space ID
                                </th>
                                <th>
                                    Lot ID
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Space Type
                                </th>
                                <th>
                                    GPS Latitude
                                </th>
                                <th>
                                    GPS Longitude
                                </th>
                                <th>
                                    Space Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parking_space.map(t3 => {
                                    return <tr>
                                        <td>{t3.space_id}</td>
                                        <td>{t3.lot_id}</td>
                                        <td>{t3.status}</td>
                                        <td>{t3.space_type}</td>
                                        <td>{t3.gps_latitude}</td>
                                        <td>{t3.gps_longitude}</td>
                                        <td>{t3.space_name}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
    </>
    
}
