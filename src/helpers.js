//import companies from '../src/components/TicketCard/TickedCard';

export function getPrice(number) {
    return new Intl.NumberFormat('ru-ru', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    }).format(number);
}

export function calculateDuration(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.round((milliseconds - hours * 3600000) / 60000);
    return `${hours}ч ${minutes}м`;
}

export function calculateTime(milliseconds) {
    return new Date(milliseconds).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function getTransfers(number) {
    let transfers = ['пересадка', 'пересадки', 'пересадок'];
    if (number === 0) {
        return 'Без пересадок';
    } else if (number === 1) {
        return `${number} ${transfers[0]}`;
    } else if (number === (2 || 3 || 4)) {
        return `${number} ${transfers[1]}`;
    } else {
        return `${number} ${transfers[2]}`;
    }
}

export function getCompany(companyId, companies) {
    return companies.find((company) => company.id === companyId).logo;
}


export function sortedCheap(tickets) {
    let ticketsPrices = tickets.map(item => item.price);
    let min = Math.min(...ticketsPrices);
    return tickets.filter(item => item.price === min);
}

export function sortedFast(tickets) {
    let ticketsDuration = tickets.map(item => item.info.duration);
    let min = Math.min(...ticketsDuration);
    return tickets.filter(item => item.info.duration === min);
}

export function sortedOptimal(tickets) {
    return sortedFast(sortedCheap(tickets));
}

export function sortedCompany(tickets, filter) {
    if (filter === 'All') {
        return tickets
    } else {
        return tickets.filter(item => item.companyId === filter);
    }
}

export function sortedTransfers(tickets, filter) {
    let result = [];

    function shuffle(arr) {
        var j, temp;
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    if (filter.length === 0) {
        return tickets
    } else {
        for (let count of filter) {
            let temp = tickets.filter(ticket => ticket.info.stops.length == +count);
            result.push(...temp);
        }
        return shuffle(result);
    }
}


export function sortedDestinationTo(tickets, filter) {
    return tickets.filter(item => item.info.origin === filter.toUpperCase());
}

export function sortedDestinationFrom(tickets, filter) {
    return tickets.filter(item => item.info.destination === filter.toUpperCase());
}

export function sortedDateTo(tickets, filter) {
    return tickets.filter(ticket => new Date(ticket.info.dateStart).toString().substring(0, 15) === new Date(filter).toString().substring(0, 15));
}

export function sortedDateFrom(tickets, filterObject) {
    console.log(tickets, filterObject);
    if (!filterObject.destinationTo && !filterObject.destinationFrom) {
        console.log('ничего');
        return tickets.filter(ticket => {
            return new Date(ticket.info.dateStart).toString().substring(0, 15) === new Date(filterObject.dateFrom).toString().substring(0, 15)
        });
    } else if (filterObject.destinationFrom && !filterObject.destinationTo) {
        console.log('только обратно');
        return tickets.filter(ticket => {
            return new Date(ticket.info.dateStart).toString().substring(0, 15) === new Date(filterObject.dateFrom).toString().substring(0, 15)
                &&
                ticket.info.destination === (filterObject.destinationFrom).toUpperCase();
        });
    } else if (!filterObject.destinationFrom && filterObject.destinationTo) {
        console.log('только туда');
        return tickets.filter(ticket => {
            return new Date(ticket.info.dateStart).toString().substring(0, 15) === new Date(filterObject.dateFrom).toString().substring(0, 15)
                &&
                ticket.info.origin === (filterObject.destinationTo).toUpperCase();
        });
    } else if (filterObject.destinationFrom && filterObject.destinationTo) {
        return tickets.filter(ticket => {
            console.log('все');
            return new Date(ticket.info.dateStart).toString().substring(0, 15) === new Date(filterObject.dateFrom).toString().substring(0, 15)
                &&
                ticket.info.origin === (filterObject.destinationFrom).toUpperCase()
                &&
                ticket.info.destination === (filterObject.destinationTo).toUpperCase();
        });
    }
}

export function sortedMultipleFilters(tickets, filterObject) {
    let result = tickets;
    let returnTickets = [];
    for (let key in filterObject) {
        if (filterObject[key].length !== 0) {

            switch (key) {

                case 'company':
                    result = sortedCompany(result, filterObject[key]);
                    break;
                case 'transfers':
                    result = sortedTransfers(result, filterObject[key]);
                    break;
                case 'destinationTo':
                    result = sortedDestinationTo(result, filterObject[key]);
                    break;
                case 'destinationFrom':
                    result = sortedDestinationFrom(result, filterObject[key]);
                    break;
                case 'dateTo':
                    result = sortedDateTo(result, filterObject[key]);
                    break;
                case 'dateFrom':
                    returnTickets = sortedDateFrom(tickets, filterObject);
                    result = result.concat(returnTickets);
                    break;

                // case 'dateTo':
                //     result = sortedSearchPanel(result, filterObject);
                //     break;
                // case 'dateFrom':
                //     result = sortedSearchPanel(result, filterObject);
                //     break;
            }
        }
    }

    return result;
}
