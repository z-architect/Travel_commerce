import axios from 'axios';

import LOGIN_USER from './types';

export default function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response => response.data);
    //console.log(request)
    return{
        type:LOGIN_USER,
        payload:request
    }
}