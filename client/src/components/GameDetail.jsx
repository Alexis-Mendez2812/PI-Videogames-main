import { useParams } from "react-router-dom"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {  getIdGame } from "../actions";
import "../styles/CardDetail.scss"

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

    <div className="CardDetail-body">
          <div className="CardDetail-conteiner-img">
      <h1 className="CardDetail-h1"  >{name}</h1>
    <img className="CardDetail-img" src={background_image} alt={background_image} />
    </div>
    <div className="CardDetail-conteiner">
    <div>
     <h4 className="CardDetail-span">Rating: </h4>
     <label className="CardDetail-rating">{rating} ⭐ </label><br/>
    </div>

     <div>
     <h4 className="CardDetail-Released">Released: </h4>
     <label className="CardDetail-Released">{released}</label>
     </div>
     <div className="CardDetail-div-genres">
     <h4 className="CardDetail-genres">Genres: </h4>
     <ul className="CardDetail-ul-genres"> 

         {Genres.map((e)=>(<li className="CardDetail-platforms" key={e.id}>{e.name} </li>))}
    </ul><br/>
     </div>
    <div  className="CardDetail-div-plat">

     <h4 className="CardDetail-span">Platforms: </h4>
     <ul className="CardDetail-ul"> 
         {platforms.map((e)=>(<li className="CardDetail-platforms" key={e}>{e} </li>))}
    </ul>
    </div>
<div className="CardDetail-label">

     <h4 className="CardDetail-span">Description: </h4>
     <label className="CardDetail-label">{description}</label>
</div>
    

    </div>
  
    
    </div>
)}
return (<h1>Cargando...</h1>)
};