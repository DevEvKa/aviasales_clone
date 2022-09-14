import axios from 'axios';
import { actionUpdateCompanies, actionUpdateTickets } from '../../store/actions';

//вернуть async await!!!!!!!!!!!!!!!!!!!!1

export default function getData() {
    console.log('before');

    return function (dispatch) {
        //console.log('inner');
        
        const urlCompanies = 'https://api.npoint.io/a1b1c28b32d9785bb26c',
            urlTickets = 'https://api.npoint.io/163b5e66df9f2741243e';

            //axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

            
        axios
            .all([axios.get(urlCompanies), axios.get(urlTickets)])
            .then((response) => {
            const [companies, tickets] = response;
            console.log(response);
            dispatch(actionUpdateCompanies(companies.data));
            dispatch(actionUpdateTickets(tickets.data));
        }
        )
            .catch((error) => console.log(error));
        }
}





// export default function getData() {
//     console.log('before')
//     return async function (dispatch) {
//         console.log('inner')
//         const urlCompanies = 'https://api.npoint.io/a1b1c28b32d9785bb26c',
//             urlTickets = 'https://api.npoint.io/163b5e66df9f2741243e';
            
//         let res = await axios
//             .all([axios.get(urlCompanies), axios.get(urlTickets)]);

//         res.then((response) => {
//             const [companies, tickets] = response;
//             dispatch(actionUpdateCompanies(companies.data));
//             dispatch(actionUpdateTickets(tickets.data));
//         }
//         )
//             .catch((error) => console.log(error));
//     }
// }
