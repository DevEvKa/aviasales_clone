import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

//components
import Header from '../Header/Header.js';
import SearchPanel from '../SearchPanel/SearchPanel.js';

//styles
import './App.scss';
import theme from '../../styles/Styles.js';

function App() {

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Header />
                <SearchPanel />
            </div>
        </ThemeProvider>
    );
}

export default App;