// basicSelect.js

import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ handleChangeSortBy, sortBy }) {
  const handleChange = (event) => {
    handleChangeSortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value="activity">Latest</MenuItem>
          <MenuItem value="creation">Oldest</MenuItem>
          <MenuItem value="popular">Most Used</MenuItem>
          <MenuItem value="name">Alphabetically</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
