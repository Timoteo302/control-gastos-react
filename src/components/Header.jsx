import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    isvalidPresupuesto, 
    setIsValidPresupuesto, 
    gastos,
    setGastos
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isvalidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}

    </header>
  )
}

export default Header
