export const actionUpdateCompanies = (payload) => ({
    type: 'UPDATE_COMPANIES',
    payload,
})

export const actionUpdateTickets = (payload) => ({
    type: 'UPDATE_TICKETS',
    payload,
})

export const actionUloadTickets = (payload) => ({
    type: 'UPLOAD_TICKETS',
    payload,
})

export const actionDirectionChangeValues = (payload) => ({
    type: 'DIRECTIONCHANGEVALUES',
    payload,
})

//filters' actions
export const actionDirectionToFilter = (payload) => ({
    type: 'DIRECTIONTO_FILTER',
    payload,
})
export const actionDirectionFromFilter = (payload) => ({
    type: 'DIRECTIONFROM_FILTER',
    payload,
})
export const actionDateToFilter = (payload) => ({
    type: 'DATETO_FILTER',
    payload,
})
export const actionDateFromFilter = (payload) => ({
    type: 'DATEFROM_FILTER',
    payload,
})
export const actionCheapestTicketFilter = (payload) => ({
    type: 'CHEAPEST_FILTER',
    payload,
})
export const actionFastestTicketFilter = (payload) => ({
    type: 'FASTEST_FILTER',
    payload,
})
export const actionOptimalTicketFilter = (payload) => ({
    type: 'OPTIMAL_FILTER',
    payload,
})
export const actionTransferTicketFilter = (payload) => ({
    type: 'TRANSFER_FILTER',
    payload,
})
export const actionCompanyTicketFilter = (payload) => ({
    type: 'COMPANY_FILTER',
    payload,
})

