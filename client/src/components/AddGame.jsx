import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/Form.scss";
import { createGame, getGenres, getGames } from "../actions";
// className="Form-"
export default function AddGame() {
  const state = useSelector((state) => state.Genres);
  const allGames = useSelector((state) => state.allGames);
  const gamed = useSelector((state) => state.gamed);
  const history = useHistory();
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
  let [platforms, setPlatforms] = useState([]);
  let response = "";
  const [select, setSelect] = useState([]);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();

  if (Array.isArray(allGames)) {
    platforms = allGames.map((e) => e.platforms);
    platforms = platforms.flat().sort();

    const dataArr = new Set(platforms);

    platforms = [...dataArr];
  }

  // console.log("controller",controller)
  // console.log("game.genres",game.genres)
  console.log("gamed", gamed);
  if (gamed) {
    setTimeout(() => {
      console.log("set", gamed);

      history.push(`/home/${gamed.id}`);
    }, 2000);
  }

  const handleOnSubmit = async function (event) {
    event.preventDefault();
    if (
      !controller.button &&
      game.name &&
      game.description &&
      game.platforms &&
      game.genres
    ) {
      await dispatch(createGame({ ...game, createdDb: true }));
      alert(`LOADING ${game.name || gamed.name}...`);
      response = game.name;
    } else {
      alert("Complete todos los requisitos");
    }
  };
  const handleOnChange = function (event) {
    setGame({ ...game, [event.target.name]: event.target.value });
    setController(
      validate({ ...game, [event.target.name]: event.target.value })
    );
  };
  const handleOnPlatforms = function (event) {
    if (!select.find((e) => e === event.target.value)) {
      setSelect([...select, event.target.value]);
      setGame({ ...game, platforms: [...select, event.target.value] });
      setController(
        validate({ ...game, platforms: [...select, event.target.value] })
      );
    } else {
      setSelect(select.filter((e) => e !== event.target.value));
      setGame({
        ...game,
        platforms: select.filter((e) => e !== event.target.value),
      });
      setController(
        validate({
          ...game,
          platforms: select.filter((e) => e !== event.target.value),
        })
      );
      if (select.length === 1) {
        setGame({ ...game, platforms: "" });
        setController(validate({ ...game, platforms: "" }));
      }
    }
  };

  const handleOnGenres = (event) => {
    if (!genres.find((e) => e === event.target.value)) {
      setGenres([...genres, event.target.value]);
      setGame({ ...game, genres: [...genres, event.target.value] });
      setController(
        validate({ ...game, genres: [...genres, event.target.value] })
      );
    } else {
      setGenres(genres.filter((e) => e !== event.target.value));
      setGame({
        ...game,
        genres: genres.filter((e) => e !== event.target.value),
      });
      setController(
        validate({
          ...game,
          genres: genres.filter((e) => e !== event.target.value),
        })
      );
      if (genres.length === 1) {
        setGame({ ...game, genres: "" });
        setController(validate({ ...game, genres: "" }));
      }
    }
  };
  // console.log("rating",typeof game.rating)

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className="Form-body">
      <form onSubmit={handleOnSubmit} className="Form-form">
        <div className="Form-div-title">
          <h1 className="Form-title">Create your Game!</h1>
        </div>
        <div className="Form-div-inputs">
          <div className="Form-div-boxs">
            <label className="Form-label ">Name *</label> <br />
            <input
              className="Form-input"
              type="text"
              name="name"
              value={game.name}
              placeholder="Title"
              onChange={handleOnChange}
            />
          </div>
          <div className="Form-div-boxs">
            <label className="Form-label ">Description *</label>
            <br />
            <input
              className="Form-input"
              type="text"
              name="description"
              value={game.description}
              placeholder="Description"
              onChange={handleOnChange}
            />
          </div>

          <div className="Form-div-boxs">
            <label className="Form-label ">URL Image </label>
            <br />
            <input
              className="Form-input"
              type="text"
              name="background_image"
              value={game.background_image}
              placeholder="URL Image"
              onChange={handleOnChange}
            />
          </div>
          <div className="Form-div-boxs">
            <label className="Form-label ">Released</label>

            <input
              className="Form-"
              type="date"
              id="start"
              name="released"
              min="2021-01-01"
              max="2023-12-31"
              value={game.released}
              placeholder="Releaced"
              onChange={handleOnChange}
            ></input>
          </div>

          <div className="Form-div-boxs">
            <label className="Form-label ">Rating </label>

            <input
              className="Form-input slider"
              type="range"
              min="0"
              max="5"
              step="0.1"
              id="myRange"
              name="rating"
              value={game.rating}
              placeholder="Rating"
              onChange={handleOnChange}
            />
            <output
              id="outrat"
              name="outrat"
              htmlFor="rat"
              className="Form-output"
            >
              {game.rating || 0}
            </output>
          </div>
          <div className="Form-div-boxs">
            <div className="Form-input-plat">          <label className="Form-label ">Platforms *</label>
            <br />
            <select onChange={handleOnPlatforms} className="Form-">
              {platforms &&
                platforms.map((e) => (
                  <option
                    key={e}
                    value={e}
                    onChange={handleOnPlatforms}
                    className="Form-"
                  >
                    {e}
                  </option>
                ))}
            </select>
            </div>
  
            {select &&
              select.map((e) => (
                <div key={e + 1} className="Form-genres">
                  <li name={e} value={e} className="Form-">
                    {e}{" "}
                  </li>
                  <button
                    type="button"
                    onClick={handleOnPlatforms}
                    value={e}
                    className="Form-"
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
          <div className="Form-div-boxs">
            <label className="Form-label ">Genres *</label>
            <div className="Form-genres-all">
              {state &&
                state.map((e) => (
                  <div className="Form-genres">
                    <label key={e.id} htmlFor={e.name} className="Form-">
                      <input
                        className="Form-"
                        type="checkbox"
                        id={e.name}
                        key={e.name}
                        name={e.name}
                        value={e.name}
                        onChange={handleOnGenres}
                        onClick={handleOnGenres}
                      />
                      {e.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="Form-">
            {/* {controller.button === "button" && (
              <input
                className="Form-fake-button"
                type="button"
                value="CREATE?"
              ></input>
            )} */}
            {controller.button === "button" && (
              <input
                className="myButton fake"
                type="button"
                value="👻"
              ></input>
            )}
            {/* {!controller.button && (
              <button type="submit" className="Form-button">
                CREATE
              </button>
            )} */}
            {!controller.button && (
              <button type="submit" class="myButton">🎮
              </button>
            )}
            {response && <h4 className="Form-">LOADING {response} ...</h4>}
          </div>
        </div>
        <div className="Form-div-controlers">
          {controller.name && (
            <p className="Form-controller">●{controller.name}</p>
          )}

          {controller.description && (
            <p className="Form-controller">●{controller.description}</p>
          )}
          {controller.background_image && (
            <p className="Form-controller">●{controller.background_image}</p>
          )}
          {controller.released && (
            <p className="Form-controller">●{controller.released}</p>
          )}

          {controller.rating && (
            <p className="Form-controller">●{controller.rating}</p>
          )}

          {controller.platforms && (
            <p className="Form-controller">●{controller.platforms}</p>
          )}
          {controller.genres && (
            <p className="Form-controller">●{controller.genres}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export function validate(game) {
  let controller = {};
  //NOMBRE plataformas-generos
  if (!game.name) {
    controller.name = "The name is required";
  } else if (!/^[A-Za-z0-9\s]+$/g.test(game.name)) {
    controller.name = "No special characters, just letters and/or numbers";
  }

  //DESCRIPTION
  if (!game.description) {
    controller.description = "The description is required";
  } else if (game.description.length > 255) {
    controller.description =
      "The description should not be more than 255 characters";
  }

  //background_image https://media.vandal.net/i/1200x630/3-2022/20223112333098_1.jpg
  if (
    !/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(
      game.background_image
    ) &&
    game.background_image !== ""
  ) {
    controller.background_image = "Enter valid url";
  } else if (!game.background_image) {
    controller.background_image = "";
  }

  //rating
  if (game.rating > 5 || game.rating < 0) {
    controller.rating = "The rating must be between 0 and 5";
  }

  //platforms
  if (!game.platforms || game.platforms.legth < 1) {
    controller.platforms = "The platforms are required";
  }
  //genres
  if (!game.genres) {
    controller.genres = "The genre is required";
  } else if (game.genres.length > 5) {
    controller.genres = "5 genres at most";
  }

  if (
    controller.name ||
    controller.background_image ||
    controller.genres ||
    controller.rating ||
    controller.platforms ||
    controller.released ||
    controller.description ||
    !game.name ||
    !game.description ||
    !game.platforms ||
    !game.genres
  ) {
    controller.button = "button";
  }
  // console.log("controller",controller);
  // console.log("game",game)
  return controller;
}
