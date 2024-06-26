"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { setDepth } from './Grid';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  
];

function valuetext(value: number) {
  return `${value}`;
}

export default function CustomSlider() {
  const [value, setValue] = useState(6);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setDepth(newValue as number);
  };

  return (
    <div className='flex items-center justify-center h-24'>
      <Box sx={{ width: 250 }}>
        <Slider
          min={1}
          max={8}
          aria-label="Custom marks"
          value={value}
          onChange={handleChange}
          defaultValue={6}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          />
          <div className='flex justify-center'>
          <div>Depth: {value}</div>

          </div>
      </Box>
    </div>
    
  );
}
