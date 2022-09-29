import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionDirectionToFilter, actionDirectionFromFilter, actionDateToFilter, actionDateFromFilter, actionDirectionChangeValues } from '../../store/actions';
import { sortedMultipleFilters } from '../../helpers';

import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'date-fns';
import ru from 'date-fns/locale/ru';

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
    console.log(new Date(filter).toString().substring(0, 15))
    setDateFromValue(filter);
  }

  const changeInputValuesHandleClick = (e) => {
    e.preventDefault();
    let directionToInput = document.querySelector('.directionToInput');
    let directionToValue = directionToInput.querySelector('input').value;
    let directionFromInput = document.querySelector('.directionFromInput');
    let directionFromValue = directionFromInput.querySelector('input').value;
    let tempValue = directionToValue;
    directionToValue = directionFromValue;
    directionFromValue = tempValue;

    let newActiveFilterCases = { ...activeFilterCases, destinationTo: directionToValue, destinationFrom: directionFromValue };
    let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
    dispatch(actionDirectionChangeValues({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));
    setDirectionToValue(directionToValue);
    setDirectionFromValue(directionFromValue);
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
      <button className='searchPanel__replaceDirectionValuesBtn' onClick={changeInputValuesHandleClick}>
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.5H2.5V4V4.79289L0.707107 3L2.5 1.20711V2V2.5H3H12.5V3.5H3Z" stroke="#2196F3" />
          <path d="M11 8.5H11.5V8V7.20711L13.2929 9L11.5 10.7929V10V9.5H11L1.5 9.5V8.5L11 8.5Z" stroke="#2196F3" />
        </svg>
      </button>

      <StyledTextField
        value={directionToValue}
        className="directionToInput"
        onChange={directionToValueHandleChange}
        placeholder="Откуда"
        variant="outlined"
      />
      <StyledTextField
        value={directionFromValue}
        className="directionFromInput"
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
                placeholder: 'Обратно',
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
