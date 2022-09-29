const initialState = {
    companies: [],
    tickets: [],
    cheapestTickets: [],
    fastestTickets: [],
    optimalTickets: [],
    sortedByCompanyTickets: [],
    filteredTickets: [],
    activeFilterCases: {
        company: '',
        transfers: [],
        destinationTo: '',
        destinationFrom: '',
        dateTo: '',
        dateFrom: '',
    },
    currentTab: '',
    transfersFilterArray: [],
    companyNameFilter: '',
    ticketsCounter: 6,
};

export const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COMPANIES':
            return { ...state, companies: action.payload }
        case 'UPDATE_TICKETS':
            return { ...state, tickets: action.payload }
        case 'UPLOAD_TICKETS':
            return { ...state, ticketsCounter: state.ticketsCounter + 5 };
        case 'DIRECTIONCHANGEVALUES':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab };
        case 'DIRECTIONTO_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab };
        case 'DIRECTIONFROM_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab };
        case 'DATETO_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab };
        case 'DATEFROM_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab };
        case 'CHEAPEST_FILTER':
            return { ...state, cheapestTickets: action.payload.sorted, currentTab: action.payload.currentTab }
        case 'FASTEST_FILTER':
            return { ...state, fastestTickets: action.payload.sorted, currentTab: action.payload.currentTab }
        case 'OPTIMAL_FILTER':
            return { ...state, optimalTickets: action.payload.sorted, currentTab: action.payload.currentTab }
        case 'COMPANY_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab }
        case 'TRANSFER_FILTER':
            return { ...state, filteredTickets: action.payload.sorted, activeFilterCases: action.payload.activeFilterCases, currentTab: action.payload.currentTab }
        default: return state;
    }
}
