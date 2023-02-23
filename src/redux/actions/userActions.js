
import {ADDUSER,DELETEUSER,DISPLAYUSER} from '../constants/types'
export const addUser =(data)=>{
    return {
        type:ADDUSER,
        data:data
    }
}
export const deleteUser =(data)=>{
    return {
        type:DELETEUSER,
        data:data
    }
}
export const displayUser =(data)=>{
    return {
        type:DISPLAYUSER,
        data:data
    }
}

