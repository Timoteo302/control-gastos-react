import { useState, useEffect } from 'react'

const Filtros = ({ filtro, setFiltro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className="campo">
                    <label htmlFor="filtros">Filtrar Gastos</label>
                    <select id="filtros"
                        value={filtro}
                        onChange={( (e) => setFiltro(e.target.value))}
                    >
                        <option value="">-- Todos --</option>
                        <option value="comida">Comida</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="casa">Casa</option>
                        <option value="pasatiempo">Pasatiempos</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filtros
