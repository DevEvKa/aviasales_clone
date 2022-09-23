import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionCheapestTicketFilter, actionFastestTicketFilter, actionOptimalTicketFilter } from '../../store/actions';

import { sortedCheap, sortedFast, sortedOptimal } from '../../helpers';

import './PreferencesButtons.scss';

function PreferencesButtons() {
    const dispatch = useDispatch();
    let tickets = useSelector((state) => state.ticketsReducer.tickets);
    let filteredTickets = useSelector((state) => state.ticketsReducer.filteredTickets);

    function getCheapestTicketBtnHandleClick(e) {
        e.preventDefault();
        let targetTickets = filteredTickets.length === 0 ? tickets : filteredTickets;
        let sortedState = sortedCheap(targetTickets);
        dispatch(actionCheapestTicketFilter({ sorted: sortedState, currentTab: 'cheapest' }));
    }

    function getFastestTicketBtnHandleClick(e) {
        e.preventDefault();
        let targetTickets = filteredTickets.length === 0 ? tickets : filteredTickets;
        let sortedState = sortedFast(targetTickets);
        dispatch(actionFastestTicketFilter({ sorted: sortedState, currentTab: 'fastest' }));
    }

    function getOptimalTicketBtnHandleClick(e) {
        e.preventDefault();
        let targetTickets = filteredTickets.length === 0 ? tickets : filteredTickets;
        let sortedState = sortedOptimal(targetTickets);
        dispatch(actionOptimalTicketFilter({ sorted: sortedState, currentTab: 'optimal' }));
    }



    return (
        <div className="preferences">
            <button
                className="preferences__criterion criterion criterion_cheapest"
                onClick={getCheapestTicketBtnHandleClick}>
                Самый дешевый
            </button>
            <button
                className="preferences__criterion criterion criterion_fastest"
                onClick={getFastestTicketBtnHandleClick}>
                Самый быстрый
            </button>
            <button
                className="preferences__criterion criterion criterion_optimal"
                onClick={getOptimalTicketBtnHandleClick}>
                Оптимальный
            </button>
        </div>
    );
}

export default PreferencesButtons;
