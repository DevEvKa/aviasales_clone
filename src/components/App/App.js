import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

//components
import Header from '../Header/Header.js';
import SearchPanel from '../SearchPanel/SearchPanel.js';
import TransfersChoice from '../TransfersChoice/TransfersChoice.js';
import CompanyChoice from '../CompanyChoice/CompanyChoice.js';

//styles
import './App.scss';
import theme from '../../styles/Styles.js';

function App() {

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
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;