import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres } from "../actions";

export default function AddGame() {
  const state = useSelector((state) => state.Genres);
  const [game, setGame] = useState({
    name: "",
    background_image: "",
    genres: [],
    rating: 0,
    platforms: "",
    released: "",
    description: "",
  });
  const [controller, setController] = useState({});
  const [select, setSelect] = React.useState([])

  const dispatch = useDispatch();

  const handleOnSubmit = function (event) {
    event.preventDefault();
    dispatch(createGame(game));
  };
  const handleOnChange = function (event) {
    setGame({ ...game, [event.target.name]: event.target.value });
    setController(
      validate({ ...game, [event.target.name]: event.target.value })
    );
  };

  const handleSelectChange = (event) => {  
    if(!select.find(e => e === event.target.value)){ 
      setSelect([ 
      ...select, 
      event.target.value
    ]) 
    }else{ 
      setSelect(select.filter(e => e !== event.target.value))
    }  
  } 

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Create your Game!</h1>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="name"
            value={game.name}
            placeholder="Title"
            onChange={handleOnChange}
          />
          {controller.name && <p>-{controller.name}</p>}
          <input
            type="text"
            name="description"
            value={game.description}
            placeholder="Description"
            onChange={handleOnChange}
          />
          {controller.description && <p>-{controller.description}</p>}
          <input
            type="text"
            name="background_image"
            value={game.background_image}
            placeholder="Image"
            onChange={handleOnChange}
          />
          {controller.background_image && <p>-{controller.background_image}</p>}
          <input
            type="text"
            name="released"
            value={game.released}
            placeholder="Releaced"
            onChange={handleOnChange}
          />
          {controller.released && <p>-{controller.released}</p>}
          <input
            type="range" min="0" max="5" step="0.1" id="rat"
            name="rating"
            value={game.rating}
            placeholder="Rating"
            onChange={handleOnChange}
          />
          <output id="outrat" name="outrat" for="rat" >{game.rating||0}</output>
          {controller.rating && <p>-{controller.rating}</p>}
          <input
            type="text"
            name="platforms"
            value={game.platforms}
            placeholder="Platforms"
            onChange={handleOnChange}
          />
          {controller.platforms && <p>-{controller.platforms}</p>}

          <div className='genres'> 
          {state && state.map((e) => ( 
            <label key={e.id} htmlFor={e.name}><input 
            type='checkbox'  
            id={e.name}
            name={e.name} 
            value={e.name} 
            onChange={handleSelectChange}  
            />{e.name}</label>
          ))}        
        </div>
          {controller.genres && <p>-{controller.genres}</p>}
          <div>
            <button type="submit">CREATE</button>
          </div>
        </form>
      </div>
    </>
  );
}

export function validate(game) {
  let controller = {};
  //NOMBRE
  if (!game.name) {
    controller.name = "El nombre es requerido";
  } else if (!/^[A-Za-z0-9\s]+$/g.test(game.name)) {
    controller.name = "Sin caracteres especiales, solo letras y/o números";
  }

  // //background_image
  // if (!game.background_image) {
  //   controller.background_image = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.background_image)) {
  //   controller.background_image = "El nombre no debe contener numeros";
  // }
  // //genres
  // if (!game.genres) {
  //   controller.genres = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.nagenresme)) {
  //   controller.genres = "El nombre no debe contener numeros";
  // }
  // //rating
  // if (!game.rating) {
  //   controller.rating = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.rating)) {
  //   controller.rating = "El nombre no debe contener numeros";
  // }
  // //platforms
  // if (!game.platforms) {
  //   controller.platforms = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.naplatformsme)) {
  //   controller.platforms = "El nombre no debe contener numeros";
  // }
  // //released
  // if (!game.released) {
  //   controller.released = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.released)) {
  //   controller.released = "El nombre no debe contener numeros";
  // }
  // //description
  // if (!game.description) {
  //   controller.description = "El nombre es requerido";
  // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(game.description)) {
  //   controller.description = "El nombre no debe contener numeros";
  // }

  return controller;
}
