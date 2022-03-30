
import React from 'react';

export default function AddGame(){


    const [fruta, setFruta] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')

    const guardarDatos = (e) => {
        e.preventDefault()
        
        if(!fruta.trim()){
            alert('esta vacio fruta')
            return
        }
        
        if(!descripcion.trim()){
            alert('esta vacio descripcion')
            return
        }
        
        alert('Bien! Creamos a ' + fruta)

        e.target.reset()
        setFruta('')
        setDescripcion('')
    }

    return (
        <>
        <div>
            <h1>Create your dog!🐕</h1>
            <form onSubmit={ guardarDatos } >

            <h3>Name</h3>
                <input 
                    type="text"
                    placeholder="Nombre"
                    onChange={ (e) => setFruta(e.target.value) }
                    />
                    <h3>height</h3>
                <input 
                    type="text"
                    placeholder="Min "
                    onChange={ e => setDescripcion(e.target.value) }
                    />
                <input 
                    type="text"
                    placeholder="Max "
                    onChange={ e => setDescripcion(e.target.value) }
                    />
                    <h3>weight</h3>
                <input 
                    type="text"
                    placeholder="Min "
                    onChange={ e => setDescripcion(e.target.value) }
                    />
                <input 
                    type="text"
                    placeholder="Max "
                    onChange={ e => setDescripcion(e.target.value) }
                    />
                    <h3>Life span</h3>
                <input 
                    type="text"
                    placeholder="life span "
                    onChange={ e => setDescripcion(e.target.value) }
                    />
                    <h3>Temperament/s</h3>
                <select  >
                    {/* {arr2} */}
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
                <div>
                <button type="submit">Agregar</button>
                </div>
            </form>
        </div>
        </>
    )
}