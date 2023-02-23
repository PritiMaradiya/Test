import {ADDUSER,DELETEUSER, DISPLAYUSER} from '../constants/types'
const initialState = {
    userData: [],
    deleteUser:[]
}
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case ADDUSER:
            return { ...state, userData:[...state.userData,action.data] };

        case DELETEUSER :
            return {
                ...state ,
                deleteUser:[...state.deleteUser, action.data]
            }

        case DISPLAYUSER :
            return state

        default:
            return state
    }


}