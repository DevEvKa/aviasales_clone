import * as React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import theme from '../../styles/Styles';

function TicketListButton() {
    let numberOfTicketsToUpload = 5;
    const dispatch = useDispatch();

    const uploadTicketsBtnHandleClick = (event) => {
        event.preventDefault();
        dispatch({ type: "UPLOAD_TICKETS", payload: numberOfTicketsToUpload })
    };

    return (
        <Button
            variant="contained"
            sx={{
                width: '100%',
                padding: '15px',
                lineHeight: '20px',
                borderRadius: '5px',
                fontWeight: '600',
                '&:hover': {
                    bgcolor: theme.palette.hover.main,
                    color: theme.palette.primary.main,
                },
                '&:active': {
                    bgcolor: theme.palette.hover.main,
                    color: theme.palette.primary.main,
                },
            }}
            onClick={uploadTicketsBtnHandleClick}
        >
            Показать еще 5 билетов
        </Button>
    );
}

export default TicketListButton;
