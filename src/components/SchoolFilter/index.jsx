import React, { useContext, useState } from 'react';
import { SchoolContext } from '../../App'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SchoolFilter() {
  // Select school to view data for (including option for all schools)
  const { school, setSchool } = useContext(SchoolContext);

  const handleChange = (event) => {
    setSchool(event.target.value);
  };

  return (
    <Box className="school-filter">
      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel id="school-filter-label">School</InputLabel>
        <Select
          id="school-filter"
          value={school}
          label="School"
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value={"All Schools"}>All Schools</MenuItem>
          <MenuItem value={"Brown"}>Brown</MenuItem>
          <MenuItem value={"Columbia"}>Columbia</MenuItem>
          <MenuItem value={"Cornell"}>Cornell</MenuItem>
          <MenuItem value={"Dartmouth"}>Dartmouth</MenuItem>
          <MenuItem value={"Harvard"}>Harvard</MenuItem>
          <MenuItem value={"UPenn"}>UPenn</MenuItem>
          <MenuItem value={"Princeton"}>Princeton</MenuItem>
          <MenuItem value={"Yale"}>Yale</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}