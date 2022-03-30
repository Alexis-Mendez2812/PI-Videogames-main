const initialState={
    games:[],
    allGames:[],
    Genres:[],
}


export default function rootReducer(state = initialState,action){

switch(action.type){
    case "GET_GAMES":
        return {
            ...state,
            games:action.payload,
            allGames:action.payload
        }
    case "GET_NAME_GAMES":
        console.log(action.payload)
        return {
            ...state,
            games:action.payload

        }
    case "GET_Genres":
        return {
            ...state,
            Genres:action.payload
        }
    case "FILTER_BY_GENRE":
        console.log(state.allGames)
        console.log(action)
        let filter = ""
        if(action.payload=== "api"||action.payload=== "db"){
             filter = action.payload === "api" ? state.allGames.filter(e=>typeof(e.id )=== "number" ) : 
            state.allGames.filter(e=>typeof(e.id )!== "number" )
        }else{

            filter = action.payload === "All" ? state.allGames : 
            state.allGames.filter ((e)=>
            isInclude(e,action.payload)
            )
            console.log("filter")
            console.log(filter)
        }
    
    return {
            ...state,
            games: filter
        }

    case "FILTER_BY_ORDER":
        console.log(state.allGames)
        console.log(action)
        /* 
asc
des
high
low */
let order= ""
switch (action.payload) {
    
    case "asc":order= state.allGames.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});break;
    case "des":order= state.allGames.sort(function (a, b) {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
});break;
    case "high":order= state.allGames.sort(function (a, b) {
  if (Number(a.rating.slice(0,2)) < Number(b.rating.slice(0,2))) {
    return 1;
  }
  if (Number(a.rating.slice(0,2)) > Number(b.rating.slice(0,2))) {
    return -1;
  }
  return 0;
});break;
    case "low":order= state.allGames.sort(function (a, b) {
  if (Number(a.rating.slice(0,2)) > Number(b.rating.slice(0,2))) {
    return 1;
  }
  if (Number(a.rating.slice(0,2)) < Number(b.rating.slice(0,2))) {
    return -1;
  }
  return 0;
});break;

    default:order=state.allGames ;
}
        // let order = ""
        // if(action.payload=== "asc"||action.payload=== "des"){
        //      order = action.payload === "api" ? state.allGames.filter(e=>typeof(e.id )=== "number" ) : 
        //     state.allGames.filter(e=>typeof(e.id )!== "number" )
        // }else{

        //     order = action.payload === "All" ? state.allGames : 
        //     state.allGames.filter ((e)=>
        //     isInclude(e,action.payload)
        //     )
        //     console.log("filter")
        //     console.log(order)
        // }
    
    return {
            ...state,
            games: order
        }
    default: return {state}
}


}

function isInclude(obj,pay){
    let str = obj.Genres
    if(str===undefined)return false
    if(str.includes(pay))return true
    return false
}