import React, { useState } from 'react';

const Locationselect = ({ names, onSelectionChange }) => {
  const [selectedName, setSelectedName] = useState('');

  const handleSelectChange = (event) => {
    setSelectedName(event.target.value);
    onSelectionChange(event.target.value);
  };

  return (
    <div>   
        <select name="place" onChange={handleSelectChange}>
          <option value=''>select place</option>
          {
            names.map((element,index)=>{
              return <option key={index} value={element}>{element}</option>
            })
          }
        </select>
    </div>
  );
};

export default Locationselect