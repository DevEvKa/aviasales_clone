import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionCompanyTicketFilter } from '../../store/actions';
import { sortedMultipleFilters } from '../../helpers';

import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

import './CompanyChoice.scss';

const StyledRadio = styled(Radio)(() => ({
    margin: '0px',
    padding: '0 10px',
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    width: '100%',
    margin: '0px',
    padding: '10px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&:hover': { backgroundColor: theme.palette.hover.main },
}));

function Company() {
    const dispatch = useDispatch();
    let companies = useSelector((state) => state.ticketsReducer.companies);
    let tickets = useSelector((state) => state.ticketsReducer.tickets);
    let activeFilterCases = useSelector((state) => state.ticketsReducer.activeFilterCases);

    function getCompanyRadioHandleClick(e) {
        e.preventDefault();
        let filter = e.target.value;
        let newActiveFilterCases = { ...activeFilterCases, company: filter };
        let sortedState = sortedMultipleFilters(tickets, newActiveFilterCases);
        dispatch(actionCompanyTicketFilter({ sorted: sortedState, activeFilterCases: newActiveFilterCases, currentTab: 'filtered' }));
    }

    return (
        <section className="options__company company">
            <h3 className="company__title">Компания</h3>
            <RadioGroup defaultValue="All" name="radio-buttons-group">
                <StyledFormControlLabel value="All" control={<StyledRadio />} label="Все" onChange={getCompanyRadioHandleClick}></StyledFormControlLabel>
                {companies?.map((company) => (
                    <StyledFormControlLabel key={company.id} value={company.id} control={<StyledRadio />} label={company.name} onChange={getCompanyRadioHandleClick} />
                ))}
            </RadioGroup>
        </section>
    );
}

export default Company;
