import React,{ useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import GamesCard from "./GamesCard"
import SearchBar from "./SearchBar"
import { getGames,getGenres,filterByGenre,filterByOrder } from "../actions"
import { Link } from 'react-router-dom';

export default function Home(){

   const [aux , setAux] = React.useState('') 

    //Mi data de los estados
   const state =useSelector(state=>state.games)
   const Genres =useSelector(state=>state.Genres)

   const dispatch = useDispatch()  
   useEffect(()=>{
   dispatch(getGames())    
    },[dispatch] )

   useEffect(()=>{
   dispatch(getGenres())    
    },[dispatch] )

//Funcion del select Genres/api/db
function handleOnGenres(event){  
    dispatch(filterByGenre(event.target.value))   
    setAux(event.target.value)} 
    console.log("estado auxiliar",aux)

//Funcion del los select by orders 
function handleOnOrder(event){  
    dispatch(filterByOrder(event.target.value))   
    setAux(event.target.value)} 
    console.log("estado auxiliar",aux)



                        return(
                        <>
<div key="searchbar">
    <SearchBar   />    
</div>

{/*Filtro de Genres */}
<select key='Genres' id='Genres' defaultValue='All' onChange={(e) => handleOnGenres(e)}> 
    <option value='All'>Genres</option>
    <option value='All'>All</option>
        {Genres && Genres.map(e => ( 
        <option key={e.name} value={e.name}>{e.name}</option>))} 
</select>

{/*Filtro de api/db */}
<select id='api/db' defaultValue='All' onChange={(e) => handleOnGenres(e)}> 
    <option value='All'>From</option>
    <option value='All'>All</ option>
    <option value='api'>api</ option>
    <option value='db'>db</   option>     
</select>

{/*Orden alfabetico */}
<select id='alf' defaultValue='All' onChange={(e) => handleOnOrder(e)}> 
    <option value='All'>Alphabetical</option>
    <option value='asc'>asc</ option>
    <option value='des'>des</   option>     
</select>

{/*Orden por rating */}
<select id='rating' defaultValue='All' onChange={(e) => handleOnOrder(e)}> 
    <option value='All'>rating</option>
    <option value='high'>high</ option>
    <option value='low'>low</   option>     
</select>
    
<button id='AddGame'><Link to={"/AddGame"}>Create a Game</Link></button> 
<div>
    {state &&  <GamesCard  games={state} />}
</div>
    
        </>
)};