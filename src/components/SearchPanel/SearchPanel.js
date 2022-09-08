import React, { useState } from 'react';

//import MUI components and their styles
import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import 'date-fns';
import ru from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//import styles
import './SearchPanel.scss';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '25%',
  backgroundColor: theme.palette.background.main,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  '& fieldset': {
    borderRadius: 0,
    padding: '10px',
    border: 'none',
  },
  '&:first-of-type': {
    borderRadius: '5px 0 0 5px',
  },
  '&:last-child': {
    borderRadius: '0 5px 5px 0',
  },
  '& svg': {
    marginRight: '18px',
    fill: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export default function SearchPanel() {
  const [directionToValue, setDirectionToValue] = useState('');
  const [directionFromValue, setDirectionFromValue] = useState('');
  const [dateToValue, setDateToValue] = useState(null);
  const [dateFromValue, setDateFromValue] = useState(null);

  const directionToValueHandleChange = (e) => {
    e.preventDefault();
    setDirectionToValue(e.target.value);
  };

  const directionFromValueHandleChange = (e) => {
    e.preventDefault();
    setDirectionFromValue(e.target.value);
  };

  const dateToValueHandleChange = (e) => {
    let filter = e.getTime();
    setDateToValue(filter);
  };

  const dateFromValueHandleChange = (e) => {
    let filter = e.getTime();
    setDateFromValue(filter);
  };

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
      noValidate
      autoComplete="off"
      className="searchPanel__directionValues"
    >
      <button className="searchPanel__replaceDirectionValuesBtn"></button>
      <StyledTextField
        value={directionToValue}
        onChange={directionToValueHandleChange}
        placeholder="Откуда"
        variant="outlined"
      />
      <StyledTextField
        value={directionFromValue}
        onChange={directionFromValueHandleChange}
        placeholder="Куда"
        variant="outlined"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <DatePicker
          value={dateToValue}
          onChange={dateToValueHandleChange}
          renderInput={({ inputProps, ...params }) => (
            <StyledTextField
              {...params}
              inputProps={{
                ...inputProps,
                placeholder: 'Когда',
              }}
              variant="outlined"
            />
          )}
          inputFormat="dd MMMM, EEEEEE"
        />
        <DatePicker
          value={dateFromValue}
          onChange={dateFromValueHandleChange}
          renderInput={({ inputProps, ...params }) => (
            <StyledTextField
              {...params}
              inputProps={{
                ...inputProps,
                placeholder: 'Когда',
              }}
              variant="outlined"
            />
          )}
          inputFormat="dd MMMM, EEEEEE"
        />
      </LocalizationProvider>
    </Box>
  );
}
