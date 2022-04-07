import React from 'react'
import CardHome from './CardHome'

export default function GamesCard({games}) {
// console.log(games[0])
  return (
    <div>
        {games.map((e)=>(
            <CardHome 
            key={e.id} 
            id={e.id} 
            name={e.name}
            background_image={e.background_image}
            Genres={e.Genres}
            rating={e.rating} />)
        )}
    </div>
  )
}
