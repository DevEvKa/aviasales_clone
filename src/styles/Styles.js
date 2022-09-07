import { createTheme } from '@mui/material/styles';

const Colors = {
    primary: '#2196F3',
    mainBackground: '#F1FCFF',
    white: '#FFFFFF',
    hover: '#F1FCFF',
    textPrimary: '#4A4A4A',
    textSecondary: '#A0B0B9',
    border: '#DFE5EC',
    placeholder: '#9EA9B7',
};

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        hover: {
            main: Colors.hover,
        },
        background: {
            main: Colors.white,
        },
    },
    typography: {
        fontSize: 12,
        fontFamily: ['Open Sans', 'sans-serif'].join(','),
    },
});

export default theme;
