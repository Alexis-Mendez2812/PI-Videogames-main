// import { Link } from "react-router-dom";


export default function GameDetail(props){
    const {dog , navigate} = props
    console.log(navigate)
    const {id,name,weight,temperament,image,life_spean,height} = dog
    return(<>
    <div key={id}>
    <img src={image} alt={image} />
    <span>{name}</span>
    <span>{weight}</span>
    <span>{life_spean}</span>
    <span>{height}</span>
    <span>{temperament}</span>
        </div>
        </>
)};