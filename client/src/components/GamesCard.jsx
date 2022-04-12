import React from 'react'
import { Link } from 'react-router-dom'
import CardHome from './CardHome'

export default function GamesCard({games}) {
// console.log(games[0])
  return (
    <div className="CardHome-container">
        {games.map((e)=>(
          <div key={e.id}  href={`/home/${e.id}`} >
          <CardHome 
            
            id={e.id} 
            name={e.name}
            background_image={e.background_image}
            Genres={e.Genres}
            rating={e.rating} />
            </div>
            )
        )}
    </div>
  )
}
