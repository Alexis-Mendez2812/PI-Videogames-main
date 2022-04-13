import React,{ useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GamesCard from "./GamesCard"
import SearchBar from "./SearchBar"
import { getGames,getGenres,filterByGenre,filterByOrder } from "../actions"
import { Link } from 'react-router-dom';
import Paginado from "./Paginado"
import "../styles/Home.scss"


export default function Home(){

   const [aux , setAux] = useState('') 

    //Mi data de los estados
   const state =useSelector(state=>state.games)
   const allGames =useSelector(state=>state.allGames)
   const Genres =useSelector(state=>state.Genres)
   const [currentPage,setCurrentPage]=useState(1)
   const [charactersPerPage,setCharactersPerPage]=useState(15)
   const indexOfLastCharacter = currentPage* charactersPerPage
   const indexOfFirstCharacter= indexOfLastCharacter- charactersPerPage

   let currentCharacters=[]
if(allGames&&allGames.length>1){ currentCharacters = state.slice(indexOfFirstCharacter,indexOfLastCharacter)
}
console.log(currentCharacters,state)
   const paginado = (pageNumber)=>{setCurrentPage(pageNumber)}

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
    // console.log("estado auxiliar",aux)

//Funcion del los select by orders 
function handleOnOrder(event){  
    dispatch(filterByOrder(event.target.value))   
    setAux(event.target.value)} 
    // console.log("estado auxiliar",aux)


                        return(
                        <div className="Home-conteiner">
                            
      <div className="Home-nav">                  
<div className="Home-search" key="searchbar">
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
    <option value='asc'>Alphabetical</option>
    <option value='asc'>asc</ option>
    <option value='des'>des</   option>     
</select>

{/*Orden por rating */}
<select id='rating' defaultValue='All' onChange={(e) => handleOnOrder(e)}> 
    <option value='All'>rating</option>
    <option value='high'>high</ option>
    <option value='low'>low</   option>     
</select>
    
<button className="Home-AddGame" id='AddGame'><Link to={"/AddGame"}>Create a Game</Link></button> 
</div>
{state &&<Paginado
charactersPerPage={charactersPerPage}
allCharacters={state.length}
paginado={paginado}
/>}
<div>
    {allGames&& <GamesCard  games={currentCharacters} />}
</div>
<div className="Home-conteiner">

{state &&<Paginado
charactersPerPage={charactersPerPage}
allCharacters={state.length}
paginado={paginado}
/>}
</div>
<p>{aux}</p>
    
</div>
)};