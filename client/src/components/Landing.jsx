import { Link } from "react-router-dom";
import "../styles/Landing.scss"
export default function Landing(){
    return(<>
    <div className="landing-all">
    <img className="landing-bkg" src="https://wallpaper.dog/large/20492255.jpg"alt="games" />

    <div className="landing-conteiner" >
        <p></p>
    </div>
    <div className="landing-landing">

    <h1 className="landing-h1">Bienvenidos!!</h1>
    <button className="landing-to-home">
        <Link to="/home">PRESS START</Link>
    </button>
    <p>Alexis Mendez</p>
    <div>

    </div>
    </div>
    </div>
        </>
)};