import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { getNameGame } from '../actions'
import "../styles/SearchBar.scss"
export default function SearchBar() {
    const [name, setName] = useState("")

    const dispatch = useDispatch()
    
    const handleOnSubmit= function (event){
      // console.log(name)
      event.preventDefault()
    dispatch(getNameGame(name)) 
    alert("Buscando")
  }
  const handleOnChange= function(event){
    setName(event.target.value)
  }
    return (
    <div className="SearchBar-body" >

    <form onSubmit={handleOnSubmit} className="SearchBar-conteiner" >
        <input type="text" placeholder='' className="SearchBar-input" onChange={handleOnChange} />
        <button type='submit' className="SearchBar-button" ><span>Search</span></button>
    </form>

    </div>
  )
}
