import {combineReducers} from 'redux';
import user from './user_reduxer';
import chat from './chat_reduxer';

const rootReduxer = combineReducers({
    user,
    chat
})

export default rootReduxer;