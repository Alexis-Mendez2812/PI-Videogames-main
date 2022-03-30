import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { getNameGame } from '../actions'

export default function SearchBar() {
    const [name, setName] = useState("")

    const dispatch = useDispatch()
    
    const handleOnSubmit= function (event){
    dispatch(getNameGame(name)) 
  }
  const handleOnChange= function(event){
    setName(event.target.value)
    handleOnSubmit(event.target.value)
  }
    return (
    <>
    <form onSubmit={handleOnSubmit} >
        <input type="text" placeholder='Busca es tuyo' onChange={handleOnChange} />
        <button type='submit' >Buscar</button>
    </form>
    </>
  )
}
