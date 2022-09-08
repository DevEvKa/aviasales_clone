import * as React from 'react';

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



function CompanyChoice() {
    function getCompanyRadioHandleClick(e) {
        e.preventDefault();
    }

    return (
        <section className="options__company company">
            <h3 className="company__title">Компания</h3>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Все" name="radio-buttons-group">
                <StyledFormControlLabel value="All" control={<StyledRadio />} label="Все" onClick={getCompanyRadioHandleClick}></StyledFormControlLabel>
            </RadioGroup>
        </section>
    );
}

export default CompanyChoice;
