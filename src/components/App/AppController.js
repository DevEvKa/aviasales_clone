import axios from 'axios';
import { actionUpdateCompanies, actionUpdateTickets } from '../../store/actions';

export default function getData() {

    return async function (dispatch) {

        const urlCompanies = 'https://api.npoint.io/a1b1c28b32d9785bb26c',
            urlTickets = 'https://api.npoint.io/163b5e66df9f2741243e';

        await axios
            .all([axios.get(urlCompanies), axios.get(urlTickets)])
            .then((response) => {
                const [companies, tickets] = response;
                dispatch(actionUpdateCompanies(companies.data));
                dispatch(actionUpdateTickets(tickets.data));
            }
            )
            .catch((error) => console.log(error));
    }
}
