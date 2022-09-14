import React from 'react';
import { useSelector } from 'react-redux';

import { getPrice, calculateDuration, calculateTime, getTransfers, getCompany } from '../../helpers';

import '../TicketCard/TicketCard.scss';


function TicketCard() {

    let companies = useSelector((state) => state.ticketsReducer.companies);
    let tickets = useSelector((state) => state.ticketsReducer.tickets);
    let cheapestTickets = useSelector((state) => state.ticketsReducer.cheapestTickets);
    let fastestTickets = useSelector((state) => state.ticketsReducer.fastestTickets);
    let optimalTickets = useSelector((state) => state.ticketsReducer.optimalTickets);
    let filteredTickets = useSelector((state) => state.ticketsReducer.filteredTickets);
    let ticketsCounter = useSelector((state) => state.ticketsReducer.ticketsCounter);
    let currentTab = useSelector((state) => state.ticketsReducer.currentTab);

    let showTickets;


    switch (currentTab) {
        case 'cheapest':
            showTickets = cheapestTickets;
            break;
        case 'fastest':
            showTickets = fastestTickets;
            break;
        case 'optimal':
            showTickets = optimalTickets;
            break;
        case 'filtered':
            showTickets = filteredTickets;
            break;

        default:
            showTickets = tickets;

    }


    //let showTickets = cheapestTickets.length ? cheapestTickets : tickets;

    return showTickets?.slice(0, ticketsCounter).map((oneTicket) => (
        <a key={oneTicket.id} href="#" className="card">
            <div className="card__common">
                <p className="card__price">{getPrice(oneTicket.price)}</p>
                <div className="card__price">
                    <img
                        className="card__logo-image"
                        src={require(`../../images/${getCompany(oneTicket.companyId, companies)}`)}
                        alt="Логотип компании"
                    />
                </div>
            </div>
            <div className="card__details">
                <div className="card__time">
                    <p className="card__title">
                        {oneTicket.info.origin} - {oneTicket.info.destination}
                    </p>
                    <p className="card__value">
                        {calculateTime(oneTicket.info.dateStart)} - {calculateTime(oneTicket.info.dateEnd)}
                    </p>
                </div>
                <div className="card__duration">
                    <p className="card__title">В пути</p>
                    <p className="card__value">{calculateDuration(oneTicket.info.duration)}</p>
                </div>
                <div className="card__transfer">
                    <p className="card__title">{getTransfers(oneTicket.info.stops.length)}</p>
                    <p className="card__value">{oneTicket.info.stops.join(', ')}</p>
                </div>
            </div>
        </a>
    ));
}

export default TicketCard;
