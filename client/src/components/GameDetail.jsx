import { useParams } from "react-router-dom"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {  getIdGame } from "../actions";


export default function GameDetail(){
    const {id} = useParams()
    // console.log(id)
    const dispatch = useDispatch()
    useEffect(() => {
      return  dispatch(getIdGame(id));
      }, [dispatch]);
    let game = useSelector((state) => state.game);
    // console.log(game)
    
    if(game){
        if(Array.isArray(game)){game=game[0]}
    const {name,background_image,Genres,rating,platforms,released,description} = game
    // console.log(Genres)
    // console.log(game)
    return (

    <div>
        <h1>{name}</h1>

     <h4>Rating: </h4>
     <label>{rating}</label>
     <h4>Genres: </h4>
     <div> 
         {Genres.map((e)=>(<label key={e.id}>{e.name} </label>))}
    </div>
     <h4>Platforms: </h4>
     <ul> 
         {platforms.map((e)=>(<li key={e}>{e} </li>))}
    </ul>
     <h4>Released: </h4>
     <label>{released}</label>
     <h4>Description: </h4>
     <label>{description}</label>
    <img src={background_image} alt={background_image} />
    </div>
)}
return (<h1>Cargando...</h1>)
};