

import React, { useState } from 'react';

const FilterControls = ({ onDayChange, onShowClick, onPlayClick }) => {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [selectedWireless, setSelectedWireless] = useState('Option1');

  return (
    <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '10px' }}>
      <select onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
        <option value="Today">Today</option>
        <option value="Yesterday">Yesterday</option>
        <option value="This Week">This Week</option>
        <option value="Previous Week">Previous Week</option>
        <option value="This Month">This Month</option>
        <option value="Previous Month">Previous Month</option>
        <option value="Custom">Custom</option>
      </select>
      <select onChange={(e) => setSelectedWireless(e.target.value)} value={selectedWireless}>
        <option value="Option1">Option 1</option>
        <option value="Option2">Option 2</option>
      </select>
      <button onClick={() => onShowClick(selectedDay)}>Show</button>
      <button onClick={onPlayClick}>Play</button>
    </div>
  );
};

export default FilterControls;
