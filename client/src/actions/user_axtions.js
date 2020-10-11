import axios from 'axios';
//const {LOGIN_USER,REGISTER_USER} =  constants;
import {LOGIN_USER,REGISTER_USER} from './types';

export default function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response => response.data);
    //console.log(request)
    return{
        type:LOGIN_USER,
        payload:request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response => response.data);
    //console.log(request)
    return{
        type:REGISTER_USER,
        payload:request
    }
}