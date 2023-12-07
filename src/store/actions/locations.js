import axios from "axios"

export const getLocations=()=>(dispatch)=>{
    axios.get('http://localhost:8181/executive/desiLocations')
    .then(response=>{
        //give the response to the reducer
        dispatch({
            type:'GET_LIST',
            payload:response.data
        })
        // return{
        //     type:'GET_LIST',
        //     payload: response.data
        // }
    })
}