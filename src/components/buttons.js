import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup size="large" variant="contained" aria-label="Basic button group"
      >
      <Button onClick={this.handlePageSize20}>20</Button>
      <Button onClick={this.handlePageSize50}>50</Button>
      <Button onClick={this.handlePageSize100}>100</Button>
    </ButtonGroup>
  );
}