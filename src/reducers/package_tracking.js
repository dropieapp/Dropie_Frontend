import {
    GET_PACKAGE_TRACKING,
} from '../actions/types';

const initialState = [];

const packageTracking = (state = initialState, action) =>  {
    switch (action.type) {
        case GET_PACKAGE_TRACKING:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default packageTracking;