import React from "react"
import "../styles/paginado.scss"


export default function Paginado({charactersPerPage,allCharacters,paginado}){
let pageNumbers=[] 
console.log(charactersPerPage,allCharacters,paginado)
for (let i = 0; i <Math.ceil(allCharacters/charactersPerPage) ; i++) {
    pageNumbers.push(i+1)
}
console.log(pageNumbers)
    return(
        <div className="paginado-container">

    <ul className="paginado-pagination">
        {pageNumbers&&
        pageNumbers.map(number=>(
            <li className="number" key={number}>
        <a onClick={()=>paginado(number)}>{number}</a>
        </li>
        ))}
    </ul>       
        </div>
)}