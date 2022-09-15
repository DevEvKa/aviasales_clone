import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionDirectionToFilter, actionDirectionFromFilter, actionDateToFilter, actionDateFromFilter } from '../../store/actions';
import { sortedMultipleFilters } from '../../helpers';


import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import 'date-fns';
import ru from 'date-fns/locale/ru';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

  //setDateFromValue(null);



  //const formatMonth = format({ locale: de }, "MMM");



  const dispatch = useDispatch();
  let tickets = useSelector((state) => state.ticketsReducer.tickets);
  let activeFilterCases = useSelector((state) => state.ticketsReducer.activeFilterCases);


  const directionToValueHandleChange = (e) => {
    e.preventDefault();
    let filter = e.target.value;

    let newActiveFilterCases = { ...activeFilterCases, destinationTo: filter };
    let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
    dispatch(actionDirectionToFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));

    setDirectionToValue(e.target.value);
  };

  const directionFromValueHandleChange = (e) => {
    e.preventDefault();
    let filter = e.target.value;

    let newActiveFilterCases = { ...activeFilterCases, destinationFrom: filter };
    let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
    dispatch(actionDirectionFromFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));

    setDirectionFromValue(e.target.value);
  };

  const dateToValueHandleChange = (e) => {
    let filter = e.getTime();
    let newActiveFilterCases = { ...activeFilterCases, dateTo: filter };
    let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
    dispatch(actionDateToFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));
    setDateToValue(filter);
  }






  const dateFromValueHandleChange = (e) => {
    let filter = e.getTime();
    let newActiveFilterCases = { ...activeFilterCases, dateFrom: filter };
    let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
    dispatch(actionDateFromFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));
    console.log(filter)
    setDateFromValue(filter);
  }


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
      className='searchPanel__directionValues'
    >
      <button className='searchPanel__replaceDirectionValuesBtn'></button>
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
