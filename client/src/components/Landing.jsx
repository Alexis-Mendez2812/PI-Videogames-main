import { Link } from "react-router-dom";

export default function Landing(){
    return(<>
    <div style={{background: "white",display:"flex"  }}>
    <img src="https://wallpaper.dog/large/20492255.jpg"alt="games" style={{height:"800px",position:"absolute",zIndex:"-1"}} />
    <div style={{background: "white",display:"block"  }}>

    <h1>Bienvenidos!!👻👾🤖🎮🕹</h1>
    <section>
        <Link to="/home">PRESS START</Link>
    </section>
    <h4>Creado por: Alexis Mendez</h4>
    <div>

    </div>
    </div>
    </div>
        </>
)};