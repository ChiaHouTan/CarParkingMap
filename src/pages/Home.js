import React, { useState } from 'react';
import Select from 'react-select';

export default function Home() {
    const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'DKITCBPL', label: 'Dundalk Institue of Technology Carrolls(DKIT) Building Parking Lot' },
    { value: 'CA', label: 'Car Park A' },
    { value: 'RB', label: 'Random B' },
    { value: 'TC', label: 'Test C' },
    { value: 'WD', label: 'Whatever D' },
  ];

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
        // Construct the URL for the Map component
        const url = '/map';
        // Change the URL of the current window
        window.location.href = url;
    }
};
    
    return <>
     <div className="container">
     <img src="/logo.png" alt="logo"  className="image"/>
     <br></br>
    <h1><b>Select Car Park</b></h1>
        <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={true} // Enables search functionality
        placeholder="Search or select an option..."
        className="react-select-container"
        classNamePrefix="react-select"
      />
      <br></br>
      <button className="search-button" onClick={handleButtonClick}>Car Park Search</button>

    
     </div>
    </>
}
