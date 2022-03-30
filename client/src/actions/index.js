import axios from "axios";

export function getGames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/games");
        return dispatch({
            type: "GET_GAMES",
            payload:json.data
        })
    }
}

export function getNameGame(name){
    return async function(dispatch){
     try{

         var json = await axios.get(`http://localhost:3001/games?name=${name}`);
         return dispatch({
             type: "GET_NAME_GAMES",
             payload:json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getGenres(){
    return async function(dispatch){
    try{

        var json = await axios.get("http://localhost:3001/genres",{});
        return dispatch({
            type: "GET_GENRES",
            payload:json.data
        })
    }catch(error){
        console.log(error)
        }
    }
}

export function filterByGenre(temp){
         return {
            type: "FILTER_BY_GENRE",
            payload:temp
        }}

export function filterByOrder(temp){
         return {
            type: "FILTER_BY_ORDER",
            payload:temp
        }}