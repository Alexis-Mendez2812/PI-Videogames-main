import React from "react"



export default function Paginado({charactersPerPage,allCharacters,paginado}){
let pageNumbers=[] 
console.log(charactersPerPage,allCharacters,paginado)
for (let i = 0; i <Math.ceil(allCharacters/charactersPerPage) ; i++) {
    pageNumbers.push(i+1)
}
console.log(pageNumbers)
    return(
        <nav>

    <div className="paginado">
        {pageNumbers&&
        pageNumbers.map(number=>(
            <span className="number" key={number}>
        <a onClick={()=>paginado(number)}>{number}</a>
        </span>
        ))}
    </div>       
        </nav>
)}