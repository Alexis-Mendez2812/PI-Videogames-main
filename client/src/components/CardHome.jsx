// import { Link } from "react-router-dom";


export default function CardHome(props){
    const {id,name,background_image,Genres,rating} = props
    console.log(Genres)
    return(
    <div key={id}>
    <img src={background_image} alt={background_image} style={{height:"100px"}} /><br/>
    
    <span >Name :{name}</span><br/>
    <span >Rating:{rating}</span><br/>
    <div> 
        {Genres.map((e)=>(<h4 key={e.id}>{e.name}</h4>))}
    </div><br/>
    {/* <button onClick={()=>navigate(id)}>Mas info</button> */}
    </div>

)};