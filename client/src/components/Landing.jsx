import { Link } from "react-router-dom";
import "../styles/Landing.scss"
export default function Landing(){
    return(<>
    <div className="landing-all">
    <img className="landing-bkg" src="https://wallpaper.dog/large/20492255.jpg"alt="games" />
<div className="character">

</div>
    <div className="landing-landing">

    <div className="landing-conteiner" >
        
    <h1 className="landing-h1">  I WANT TO PLAY A GAME </h1>
    </div>
    <div>

    <button className="landing-to-home">
        <Link to="/home">PRESS START</Link>
    </button>
    </div>
    <div className="By">

    <label>By:</label>
    <p>Alexis Mendez</p>
    </div>
    </div>
    </div>
        </>
)};