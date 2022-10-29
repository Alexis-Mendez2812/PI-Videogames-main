import { Link } from "react-router-dom";
import "../styles/CardHome.scss"

export default function CardHome(props){
    const {id,name,background_image,Genres,rating} = props
    // console.log(Genres)
    return(
    <div key={id} className="CardHome-card-conteiner" >
    <div  className="CardHome-card" >
    <div  className="CardHome-card-image" >

    <img className="CardHome-card-image2" src={background_image} alt={background_image} />
    </div>
    <div className="CardHome-details">

    <h3 >{name}</h3>

    <h4  className="CardHome-star">{rating} ⭐</h4>
    <div className="CardHome-div-span" >
        {Genres.length>0 ?  Genres.map((e)=>(<span className="CardHome-span" key={e.id}>{e.name} </span>)): <span className="CardHome-span">Sin género</span>  }<br/><br/>
    </div>
    <div >

    <a href={`/home/${id}`} className="CardHome-span" >More details...</a>
    </div>
    </div>
    </div>
    </div>

)};
