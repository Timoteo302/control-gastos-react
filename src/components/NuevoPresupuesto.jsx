import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')


  useEffect(() => {
    let timeoutId;
    if (mensaje) {
      timeoutId = setTimeout(() => {
        setMensaje('');
      }, 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [mensaje]);


  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto válido')
      return  // sale de la funcion
    }
    setMensaje('')
    setIsValidPresupuesto(true)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">

        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>
                <input 
                    type="number"
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Añadir" />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto
