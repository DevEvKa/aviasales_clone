import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import getData from './AppController.js';

//components
import Header from '../Header/Header.js';
import SearchPanel from '../SearchPanel/SearchPanel.js';
import TransfersChoice from '../TransfersChoice/TransfersChoice.js';
import CompanyChoice from '../CompanyChoice/CompanyChoice.js';
import PreferencesButtons from '../PreferencesButtons/PreferencesButtons.js';
import TicketCard from '../TicketCard/TicketCard.js';
import TicketListButton from '../TicketListButton/TicketListButton.js';

//styles
import './App.scss';
import theme from '../../styles/Styles.js';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const innerFunc = getData();
        innerFunc(dispatch);
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Header />
                <SearchPanel />
                <div className="app__content content">
                    <aside className="content__options options">
                        <TransfersChoice />
                        <CompanyChoice />
                    </aside>
                    <main className="content__results results">
                        <PreferencesButtons />
                        <TicketCard />
                        <TicketListButton />
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;