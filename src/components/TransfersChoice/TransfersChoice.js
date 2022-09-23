import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionTransferTicketFilter } from '../../store/actions';
import { sortedMultipleFilters } from '../../helpers';

import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { styled } from '@mui/material/styles';
import './TransfersChoice.scss';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    margin: '0px',
    padding: '0 10px',
    borderRadius: '2px',
    backgroundColor: theme.palette.background.main,
    '& span:checked': { backgroundColor: theme.palette.background.main },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    width: '100%',
    margin: '0px',
    padding: '10px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': { backgroundColor: theme.palette.hover.main },
}));



function Transfer() {
    const dispatch = useDispatch();
    let tickets = useSelector((state) => state.ticketsReducer.tickets);
    let activeFilterCases = useSelector((state) => state.ticketsReducer.activeFilterCases);

    let transfersArr = Array.from(activeFilterCases.transfers);


    const handleTransferChange = (event) => {
        let value = event.target.value;
        let index = transfersArr.indexOf(value);

        if (index === -1) {
            transfersArr.push(event.target.value);
        } else {
            transfersArr.splice(index, 1);
        }

        let newActiveFilterCases = { ...activeFilterCases, transfers: transfersArr };
        let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
        dispatch(actionTransferTicketFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));
    };

    return (
        <section className="options__transfer transfer">
            <h3 className="transfer__title">Количество пересадок</h3>
            <FormGroup
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <StyledFormControlLabel
                    label="Без пересадок"
                    control={<StyledCheckbox value="0" onChange={handleTransferChange} />}
                />
                <StyledFormControlLabel
                    label="1 пересадка"
                    control={<StyledCheckbox value="1" onChange={handleTransferChange} />}
                />
                <StyledFormControlLabel
                    label="2 пересадки"
                    control={<StyledCheckbox value="2" onChange={handleTransferChange} />}
                />
                <StyledFormControlLabel
                    label="3 пересадки"
                    control={<StyledCheckbox value="3" onChange={handleTransferChange} />}
                />
            </FormGroup>
        </section>
    );
}

export default Transfer;